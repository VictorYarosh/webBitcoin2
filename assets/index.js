jQuery(function() {
    let currencySymbol;

    // Slide
    let faqHeaders = $('.faq-header-wrap');
    $.each(faqHeaders, function(index, header) {
        $(header).click(function() {
            let faqBody = $(header).closest('.faq-wraper').find('.faq-text');
            if ($(header).hasClass('expanded')) {
                $(header).removeClass('expanded');
                faqBody.slideUp(200);
                $(header).addClass('closed');

            } else {
                $(header).addClass('expanded');
                faqBody.slideDown(200);
                $(header).removeClass('closed');
            }
        });
    });

    // COUNTDOWN
    function setupHeaderWarning() {
        let eventTime = moment().add(3, "minutes").add(30, "seconds");
        let currentTime = moment();
        let diffTime = eventTime.diff(currentTime);
        let duration = moment.duration(diffTime, "milliseconds");
        let interval = 100;
        let _counterInterval = setInterval(function() {
            duration = moment.duration(duration - interval, "milliseconds");
            if (duration > 0) {
                let _sec = duration.seconds().toString().length == 2 ? duration.seconds() : "0" + duration.seconds();
                $(".count").text("0" + duration.minutes() + ":" + _sec);
            } else {
                $(".count").text("00:00");
                clearInterval(_counterInterval);
                _counterInterval = null;
            }
        }, interval);
    }
    setupHeaderWarning();
    // DATE
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();
    let yyyy = today.getFullYear().toString();
    dd = dd.padStart(2, '0');
    mm = mm.padStart(2, '0');
    today = dd + '/' + mm + "/" + yyyy;

    $('.today-span').text(today);

    // time
    let dt = new Date();
    let min = dt.getMinutes();
    let sec = dt.getSeconds();
    let minn;
    let secc;
    if (min < 10) {
        minn = "0" + min;
    } else {
        minn = min;
    }
    if (sec < 10) {
        secc = "0" + sec;
    } else {
        secc = sec;
    }
    var time = dt.getHours() + ":" + minn + ":" + secc;

    // top video
    $(".top-video").click(function() {
        $(".top-video").css('display', 'none');
    });

    function updateUiNames(peopleArr) {
        let randIndex = Math.floor(Math.random() * (peopleArr.length - 1));
        let randPersonObj = peopleArr[randIndex];
        let fullName = randPersonObj.name + " " + randPersonObj.surname[0] + ".";
        let nameSpan = $('.ui-names-name');
        let wrapper = $('.ui-names-section');
        nameSpan.text(fullName);
        wrapper.fadeIn(300);
        setTimeout(function() {
            wrapper.fadeOut(300);
            setTimeout(function() {
                updateUiNames(peopleArr);
            }, 3000);
        }, 1500);
    }

    // TABLE
    document.addEventListener('visitorLocated', function(e) {
        let isoCode = e.detail.isoCode;
        $('.country-flag').attr('src', 'img/flags/' + isoCode + ".png");
        let country = e.detail.country;
        // https://api.secureleadsnow.com/language/

        switch (e.detail.isoCode) {
            case 'GB':
                currencySymbol = '£';
                break;
            case 'AT':
                currencySymbol = '€';
                break;
            case 'DE':
                currencySymbol = '€';
                break;
            case 'CH':
                currencySymbol = '€';
                break;
            case 'NL':
                currencySymbol = '€';
                break;
            case 'FR':
                currencySymbol = '€';
                break;
            case 'ES':
                currencySymbol = '€';
                break;
            case 'IT':
                currencySymbol = '€';
                break;
            case 'SE':
                currencySymbol = '€';
                break;
            case 'DK':
                currencySymbol = '€';
                break;
            case 'NO':
                currencySymbol = '€';
                break;
            case 'FI':
                currencySymbol = '€';
                break;
            case 'ZA':
                currencySymbol = 'R';
                break;
            default:
                currencySymbol = '$';
                break;
        }

        updateTable();

        $.ajax({
            method: "GET",
            url: "https://api.secureleadsnow.com/language/" + country,
            dataType: "json",
            success: function(data) {
                updateUiNames(data);
            },
            error: function(err) {
                $.ajax({
                    method: "GET",
                    url: "https://api.secureleadsnow.com/language/Australia",
                    dataType: "json",
                    success: function(data) {
                        updateUiNames(data);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
        });

        if (isoCode.toLowerCase() === "de") {
            $('.german-form-footer').css('display', "initial");
            $('.english-form-footer').css('display', "none");
            $('.german-span').css('display', "initial");
        } else {
            $('.english-form-footer').css('display', "initial");
            $('.german-form-footer').css('display', "none");
            $('.german-span').css('display', "none");
        }

        let videoUrl = "en-1.mp4";
        $.ajax({
            method: "HEAD",
            url: videoUrl,
            success: function() {
                $('.video video').attr('src', videoUrl);
            },
            error: function() {
                console.log('loading english video');
            }
        })
    });

    document.addEventListener('translationsLoaded', function() {
        $('.first-next-btn-overlay').on('click', function() {
            let wrapper = $(this).closest('[data-subject="slide-wrapper"]');
            let checkboxes = wrapper.find('.checkbox');
            let propagateClick = true;
            $.each(checkboxes, function(index, checkbox) {
                if (!$(checkbox).is(':checked')) {
                    propagateClick = false;
                }
            });
            if (propagateClick) {
                wrapper.find('button').trigger('click');
            } else {
                alert(translateSingle("Please check both checkboxes to proceed."));
            }
        });
    });

    function updateTable() {
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randIndex = Math.floor(Math.random() * (alphabet.length - 1));
        let randName = alphabet[randIndex] + "******";
        let tr = $("<tr></tr>");
        let nameTd = $("<td>" + randName + "</td>");

        let time = new Date();
        let hh = time.getHours();
        let mins = time.getMinutes();
        let ss = time.getSeconds();
        time = hh.toString().padStart(2, "0") + ":" + mins.toString().padStart(2, "0") + ":" + ss.toString().padStart(2, "0");
        let dateTimeTd = $("<td>" + today + " " + time + "</td>");

        randIndex = Math.floor(Math.random() * 10);
        let win;
        if (randIndex > 2) {
            win = true;
        } else {
            win = false;
        }

        let iconTd = $("<td></td>");
        let icon = win ? $('<i class="fas fa-check green-check"></i>') : $('<i class="fas fa-times red-times"></i>');
        iconTd.append(icon);
        let sumTd = $("<td></td>");
        let sum = win ? Math.floor(Math.random() * 700 + 100) : 0;
        sumTd.text(currencySymbol + sum.toString());

        tr.append(nameTd, dateTimeTd, iconTd, sumTd);
        $('.table tbody').prepend(tr);
        $('.table tbody tr').last().remove();

        setTimeout(updateTable, 3000);
    }

    function initTable() {
        let time;
        let tds = $(".today-td");
        $.each(tds, function(index, elem) {
            let randSubstraction = Math.floor(Math.random() * 60);
            time = new Date();
            time.setSeconds(time.getSeconds() - randSubstraction);
            time = time.getHours().toString().padStart(2, "0") + ":" + time.getMinutes().toString().padStart(2, "0") + ":" + time.getSeconds().toString().padStart(2, "0");
            $(elem).text(today + " " + time);
        });

    }

    initTable();

    $(".go-to-form").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".second-form").offset().top
        }, 1000);
    });


});