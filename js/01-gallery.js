import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
    <a class="gallery__link" href=${original}>
        <img class="gallery__image" src=${preview} data-source=${original} alt=${description} />
    </a>
</li>`
  )
  .join("");

const onGalleryClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") return;

  const largeImageURL = e.target.dataset.source;
  const largeImageAlt = e.target.alt;

  const handleKeydownEscape = (e) => {
    if (e.code === "Escape") instanceModal.close();
  };

  const instanceModal = basicLightbox.create(
    `<img src=${largeImageURL} alt=${largeImageAlt} />`,
    {
      onShow: () => {
        document.addEventListener("keydown", handleKeydownEscape);
      },
      onClose: () => {
        document.removeEventListener("keydown", handleKeydownEscape);
      },
    }
  );

  instanceModal.show();
};

galleryRef.innerHTML = galleryMarkup;
galleryRef.addEventListener("click", onGalleryClick);
