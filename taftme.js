(function () {
    console.log("Taft test loaded");
    function initMyBookmarklet() {
        const elements = document.querySelectorAll("*");
        elements.forEach((element) => {
            switch (element.className) {
                case "img": {
                    element.setAttribute(
                        "src",
                        "https://tafttest.com/" + element.width + "x" + element.height + ".png"
                    );
                    element.removeAttribute("srcset"); // TODO: replace individual images in srcset with Taft
                    break;
                }
                case "picture": {
                    const sources = element.querySelectorAll("source");
                    sources.forEach(source => {
                        const sourceSrc = source.srcset;
                        const img = new Image();

                        img.onload = function () {
                            source.setAttribute(
                                "srcset",
                                "https://tafttest.com/" + img.width + "x" + img.height + ".png"
                            );
                        }

                        img.src = sourceSrc;
                    })
                    break;
                }
            }
            const style = window.getComputedStyle(element);
            if (style.backgroundImage !== 'none') {
                element.style.backgroundImage = 'url(newImageURL)';
            }
        });
    }
    initMyBookmarklet();
});
