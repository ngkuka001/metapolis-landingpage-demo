window.addEventListener("load", function () {
  // Set height for table title -- Economy page
  const thTag = document.querySelector(".table-list th");
  const headerHeight = thTag.offsetHeight;
  const promotionTitle = document.querySelector(".promotions__title");
  promotionTitle.style.minHeight = headerHeight + "px";
});
