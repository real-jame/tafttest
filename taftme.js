// (function () {
console.log("Taft test loaded");
function initMyBookmarklet() {
    const elements = document.querySelectorAll("*");
    elements.forEach((element) => {
        switch (element.nodeName.toLowerCase()) {
            case "img": {
                console.log("Tafting", element);
                element.src = "https://tafttest.com/" + element.width + "x" + element.height + ".png";
                element.removeAttribute("srcset"); // TODO: replace individual images in srcset with Taft
                break;
            }
            case "picture": {
                console.log("Tafting", element);
                const sources = element.querySelectorAll("source");
                sources.forEach(source => {
                    const sourceSrc = source.srcset;
                    const img = new Image();

                    img.onload = function () {
                        source.srcset = "https://tafttest.com/" + img.width + "x" + img.height + ".png";
                    }

                    img.src = sourceSrc;
                })
                break;
            }
            case "svg": {
                console.log("Tafting", element);
                const svgDimensions = element.getBBox();
                if (svgDimensions.width < .5 || svgDimensions.height < .5) {
                    break;
                }
                const img = document.createElement("img");
                img.src = "https://tafttest.com/" + Math.round(svgDimensions.width) + "x" + Math.round(svgDimensions.height) + ".png";
                element.replaceWith(img);
                break;
            }
        }
        const style = window.getComputedStyle(element);
        if (style.backgroundImage !== 'none') {
            console.log("Tafting", element);
            const img = new Image();

            img.onload = function () {
                console.log("Loaded");
                element.style.backgroundImage =
                    "https://tafttest.com/" + img.width + "x" + img.height + ".png";
            }

            img.src = element.style.backgroundImage.replace(/^url\(['"]?(.+?)['"]?\)/, '$1');
        }
    });
}
initMyBookmarklet();
console.log("Done!");
// });