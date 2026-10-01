const loader =
    document.getElementById("loader");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const openButton =
    document.getElementById("openButton");

const messageButton =
    document.getElementById("messageButton");

const loveButton =
    document.getElementById("loveButton");

const loveAnswer =
    document.getElementById("loveAnswer");

const musicButton =
    document.getElementById("musicButton");

const bgMusic =
    document.getElementById("bgMusic");

const copyButton =
    document.getElementById("copyButton");

const copyMessage =
    document.getElementById("copyMessage");


/* LOADER */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                loader.classList.add(
                    "hide"
                );

            },
            700
        );

    }
);


/* OPEN WEBSITE */

openButton.addEventListener(
    "click",
    function () {

        opening.classList.add(
            "hide"
        );

        mainContent.classList.remove(
            "hidden"
        );

        document.body.style.overflowX =
            "hidden";

        playMusic();

        createHeartExplosion();

        setTimeout(
            function () {

                opening.style.display =
                    "none";

            },
            850
        );

    }
);


/* MUSIC */

function playMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.45;

    const promise =
        bgMusic.play();

    if (
        promise !== undefined
    ) {

        promise.then(
            function () {

                musicButton.textContent =
                    "🎵";

            }
        ).catch(
            function () {

                musicButton.textContent =
                    "🔇";

            }
        );

    }

}


musicButton.addEventListener(
    "click",
    function () {

        if (
            bgMusic.paused
        ) {

            bgMusic.play().then(
                function () {

                    musicButton.textContent =
                        "🎵";

                }
            ).catch(
                function () {

                    musicButton.textContent =
                        "🔇";

                }
            );

        } else {

            bgMusic.pause();

            musicButton.textContent =
                "🔇";

        }

    }
);


/* SCROLL KE PESAN */

messageButton.addEventListener(
    "click",
    function () {

        const section =
            document.getElementById(
                "messageSection"
            );

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }
);


/* LOVE BUTTON */

loveButton.addEventListener(
    "click",
    function () {

        loveAnswer.classList.toggle(
            "show"
        );

        createHeartExplosion();

        if (
            loveAnswer.classList.contains(
                "show"
            )
        ) {

            loveButton.textContent =
                "Aku juga ❤️";

        } else {

            loveButton.textContent =
                "Boleh ❤️";

        }

    }
);


/* QR CODE */

function generateQRCode() {

    const qrElement =
        document.getElementById(
            "qrcode"
        );

    if (!qrElement) return;

    if (
        typeof QRCode ===
        "undefined"
    ) {

        console.log(
            "QRCode library belum tersedia."
        );

        return;
    }

    qrElement.innerHTML = "";

    const websiteURL =
        window.location.href;

    new QRCode(
        qrElement,
        {
            text: websiteURL,
            width: 142,
            height: 142,
            colorDark: "#111111",
            colorLight: "#ffffff",
            correctLevel:
                QRCode.CorrectLevel.H
        }
    );

}


/* COPY LINK */

copyButton.addEventListener(
    "click",
    async function () {

        const link =
            window.location.href;

        try {

            await navigator.clipboard
                .writeText(link);

            copyMessage.textContent =
                "Link berhasil disalin ❤️";

        } catch (error) {

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value = link;

            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            try {

                document.execCommand(
                    "copy"
                );

                copyMessage.textContent =
                    "Link berhasil disalin ❤️";

            } catch (err) {

                copyMessage.textContent =
                    "Silakan salin link dari browser.";

            }

            document.body.removeChild(
                textarea
            );

        }

        setTimeout(
            function () {

                copyMessage.textContent =
                    "";

            },
            3000
        );

    }
);


/* FOTO POPUP */

const photoCards =
    document.querySelectorAll(
        ".photo-card"
    );

const photoModal =
    document.getElementById(
        "photoModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const closePhoto =
    document.getElementById(
        "closePhoto"
    );


photoCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const image =
                    card.getAttribute(
                        "data-image"
                    );

                if (!image) return;

                modalImage.src =
                    image;

                photoModal.classList.add(
                    "show"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* TUTUP FOTO */

function closePhotoModal() {

    photoModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

    setTimeout(
        function () {

            modalImage.src = "";

        },
        250
    );

}


closePhoto.addEventListener(
    "click",
    closePhotoModal
);


/* KLIK DI LUAR FOTO */

photoModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            photoModal
        ) {

            closePhotoModal();

        }

    }
);


/* TOMBOL ESC */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            photoModal.classList.contains(
                "show"
            )
        ) {

            closePhotoModal();

        }

    }
);


/* FLOATING HEART */

function createFloatingHeart() {

    const heart =
        document.createElement(
            "div"
        );

    heart.className =
        "floating-heart";

    heart.textContent =
        Math.random() > .5
            ? "♥"
            : "♡";

    const size =
        Math.floor(
            Math.random() * 18
        ) + 12;

    heart.style.fontSize =
        size + "px";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom =
        "-30px";

    heart.style.animationDuration =
        (
            Math.random() * 2 + 3
        ) + "s";

    document.body.appendChild(
        heart
    );

    setTimeout(
        function () {

            heart.remove();

        },
        5000
    );

}


setInterval(
    createFloatingHeart,
    1300
);


/* HEART EXPLOSION */

function createHeartExplosion() {

    const total = 14;

    for (
        let i = 0;
        i < total;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );

        heart.textContent =
            Math.random() > .5
                ? "❤️"
                : "💗";

        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.zIndex =
            "10000";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            (
                Math.random() * 18 + 15
            ) + "px";

        const angle =
            (
                Math.PI * 2 * i
            ) / total;

        const distance =
            Math.random() * 130 + 80;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.3)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out"
            }
        );

        document.body.appendChild(
            heart
        );

        setTimeout(
            function () {

                heart.remove();

            },
            950
        );

    }

}


/* KLIK DI HALAMAN */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.tagName ===
            "BUTTON"
        ) {

            return;

        }

        if (
            event.target.closest(
                ".photo-card"
            )
        ) {

            return;

        }

        const heart =
            document.createElement(
                "span"
            );

        heart.textContent =
            "♥";

        heart.style.position =
            "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.zIndex =
            "10000";

        heart.style.pointerEvents =
            "none";

        heart.style.color =
            "#ff5c9a";

        heart.style.fontSize =
            "20px";

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.5)",
                    opacity: 1
                },

                {
                    transform:
                        "translate(-50%, -120px) scale(1.5)",
                    opacity: 0
                }
            ],
            {
                duration: 700,
                easing: "ease-out"
            }
        );

        document.body.appendChild(
            heart
        );

        setTimeout(
            function () {

                heart.remove();

            },
            750
        );

    }
);


/* GENERATE QR */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                generateQRCode();

            },
            1000
        );

    }
);