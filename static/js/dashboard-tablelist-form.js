/*jslint vars: false, nomen: true, browser: true */
/*global $, console, alert, tabbedform */


(function () {
    "use strict";

    var sendInfo = function(container, cls, msg) {
            if (cls === 'out_of_sync' || cls === 'error') { cls = 'danger' }
            var messageHTML = '<div class="alert alert-' + cls +
    '"><button type="button" class="close" data-dismiss="alert">&times;</button>' +
            msg + '</div>';
            container.find('.info-container').find('.alert').remove();
            container.find('.info-container').prepend(messageHTML);
        },

        askCode = function(actions_url, action, container, value, title, placeholder) {
            askDialog(value, actions_url, title, '', placeholder, function(code) {
                $('#askDialog .ok-button.has-spinner').addClass('loading').attr('disabled', 'disabled');
                $.post(actions_url, {
                    action: action,
                    identifier: value,
                    code: code
                },
                function(data, statusText, xhr) {
                    $('#askDialog .ok-button.has-spinner').removeClass('loading').removeAttr('disabled');
                    var dialog = $('#askDialog');
                    sendInfo(dialog, data.result, data.message);
                    if (data.result === 'out_of_sync') {
                        dialog.find('.cancel-button').click();
                    } else if (data.result == 'success') {
                        dialog.find('.btn').hide();
                        dialog.find('.divDialogElements').hide();
                        dialog.find('.finish-button').show();
                    }
                },
                'json')});
        },

        sendProofingLetter = function (container, actions_url, nin, modal) {
            $.post(actions_url, {
                action: 'send_letter',
                identifier: nin
            },
            function (data, statusText, xhr) {
                if (data.result === 'error') {
                    sendInfo(container, 'danger', data.message);
                } else {
                    sendInfo(container, data.result, data.message);
                }
            },
            'json');
            modal.modal('hide');
        },

        verifyCodeInLetter = function (container, actions_url, nin, modal) {
            var value = $('#proofingLetterCode').val();
            if (!value) {
                $('#proofingLetterCode').parent().addClass('has-error');
                $('#proofingLetterCodeLabel').removeClass('hide');
            } else {
                $.post(actions_url, {
                    action: 'finish_letter',
                    identifier: nin,
                    verification_code: value
                },
                function (data, statusText, xhr) {
                    if (data.result === 'error') {
                        sendInfo(container, 'danger', data.message);
                    } else {
                        sendInfo(container, data.result, data.message);
                    }
                    modal.modal('hide');
                    $('ul.nav-tabs li.active a').click();
                },
                'json');
            }
        },

        getLetterState = function (container, action, nin) {
            var actions_url = $('.actions-url').data('url');
            $.post(actions_url, {
                action: action,
                identifier: nin
            },
            function (data, statusText, xhr) {
                if (data.result === 'error') {
                    sendInfo(container, 'danger', data.message);
                } else {
                    var modal;
                    if (!data.sent) {
                        modal = $('#sendProofingLetter');
                        modal.find('#doSendProofingLetter').click(function (e) {
                            sendProofingLetter(container, actions_url, nin, modal);
                        });
                        modal.find('#sendProofingLetterText').html(data.message);
                        modal.modal();
                    } else {
                        modal = $('#proofingLetterSent');
                        modal.find('#doSendProofingCode').click(function (e) {
                            verifyCodeInLetter(container, actions_url, nin, modal);
                        });
                        modal.find('#proofingLetterSentText').html(data.message);
                        modal.modal();
                    }
                }
            },
            'json');
        },

        initialize = function (container, url) {
            if (container.find('.form-content .alert-danger').length > 0){
                container.find('.form-content').show();
            }

            container.find('.add-new').click(function (e) {
                container.find('.form-content').toggleClass('hide');
                container.find('.add-new').toggleClass('active');
            });

            $('.resend-code').unbind('click');

            $('.resend-code').click(function(e) {
                var actions_url = $(this).attr('href'),
                    value = $(this).attr('data-identifier'),
                    dialog = $(this).parents('#askDialog');

                e.preventDefault();

                $.post(actions_url, {
                    action: 'resend_code',
                    identifier: value
                },
                function(data, statusText, xhr) {
                    sendInfo(dialog, data.result, data.message);
                },
                'json');
            });

            container.find('a.verifycode').click(function (e) {
                var identifier = $(e.target).data('identifier');
                e.preventDefault();
                container.find('table.table tr[data-identifier=' + identifier + '] input[name=verify]').click();
            });

            container.find('table.table-form input[type=button]').unbind('click').
              click(function (e) {
                var action = $(e.target).attr('name'),
                    value = $(e.target).data('index'),
                    actions_url = $('.actions-url').data('url');

                $.post(actions_url, {
                    action: action,
                    identifier: value
                },
                function(data, statusText, xhr) {
                    if (data.result == 'getcode') {
                        askCode(actions_url, action, container, value, data.message, data.placeholder);
                    } else {
                        sendInfo(container, data.result, data.message);
                        $('body').trigger('action-executed');
                    }
                },
                'json');
            });
            container.find('input#letter-proofing').unbind('click').
                click(function (e) {
                    e.preventDefault();
                    var nin_value = $(e.target).data('index'),
                        action = $(e.target).attr('name');
                    getLetterState(container, action, nin_value);
                });
    };
    tabbedform.changetabs_calls.push(initialize);
}());
