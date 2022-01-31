// Function parser data
// const dataParser = properties.map((propertie, index) => {
// const imageCode = propertie.code.substring(1);
// const imageUrl = `./images/buildings/${imageCode}.png`;
// const newType =
// index >= 9 && index <= 98 ? "SR" : index > 98 ? "R" : propertie.type;
// return { ...propertie, image: imageUrl, type: newType };
// return {...propertie, type: `type--${propertie.type.toLowerCase()}`}
// });

const getPageSize = () => {
  const screenWidth = $(window).width();
  return screenWidth <= 576 ? 10 : 30;
};


window.addEventListener("load", function () {
  // Handle active category propertie
  const category = document.querySelector(".category-wrapper");
  const propertieContainer = document.querySelector(".category-container");
  const categoryBtns = category.querySelectorAll(".category-item");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      propertieContainer
        .querySelectorAll(".propertie-wrapper")
        .forEach((propertieWrapper) =>
          propertieWrapper?.parentNode?.removeChild(propertieWrapper)
        );

      const thisType = btn.dataset.propertie;
      categoryBtns.forEach((categoryBtn) =>
        categoryBtn.classList.remove("active")
      );
      btn.classList.add("active");
      if (thisType === "type--all") {
        let container = $("#pagination");
        container.pagination({
          dataSource: function (done) {
            $.ajax({
              type: "GET",
              url: './propertiesData.json',
              success: function (response) {
                done(response);
              },
            });
          },
          showPrevious: false,
          showNext: false,
          pageSize: getPageSize(),
          callback: function (data, pagination) {
            const dataHtml = `<div class="propertie-wrapper">
          ${data
            .map(
              (item) =>
                `<div class='propertie-item ${item.type}'>
              <div class="propertie-item__card">
                <div class="propertie-icon">
                  <img src="./images/${item.type}.png" />
                </div>
                <div class="propertie-image">
                  <img src=${item.image} />
                </div>
              </div>
              <div class="propertie-item__info">
                <div class="info--name">${item.name}</div>
                <div class="info--address">
                ${item.address}
                </div>
              </div>
            </div>`
            )
            .join("")}
        </div>
        `;
            $("#data-container").html(dataHtml);
          },
        });
      } else {
        let container = $("#pagination");
        container.pagination({
          dataSource: function (done) {
            $.ajax({
              type: "GET",
              url: './propertiesData.json',
              success: function (response) {
                done(
                  response.filter((propertie) => propertie.type === thisType)
                );
              },
            });
          },
          showPrevious: false,
          showNext: false,
          pageSize: getPageSize(),
          callback: function (data, pagination) {
            const dataHtml = `<div class="propertie-wrapper">
          ${data
            .map(
              (item) =>
                `<div class='propertie-item ${item.type}'>
              <div class="propertie-item__card">
                <div class="propertie-icon">
                  <img src="./images/${item.type}.png" />
                </div>
                <div class="propertie-image">
                  <img src=${item.image} />
                </div>
              </div>
              <div class="propertie-item__info">
                <div class="info--name">${item.name}</div>
                <div class="info--address">
                ${item.address}
                </div>
              </div>
            </div>`
            )
            .join("")}
        </div>
        `;
            $("#data-container").html(dataHtml);
          },
        });
      }
    });
  });
});

// pagination function
$(function () {
  let container = $("#pagination");
  container.pagination({
    dataSource: function (done) {
      $.ajax({
        type: "GET",
        url: './propertiesData.json',
        success: function (response) {
          done(response);
        },
      });
    },
    showPrevious: false,
    showNext: false,
    pageSize: getPageSize(),
    callback: function (data, pagination) {
      const dataHtml = `<div class="propertie-wrapper">
    ${data
      .map(
        (item) =>
          `<div class='propertie-item ${item.type}'>
        <div class="propertie-item__card">
          <div class="propertie-icon">
            <img src="./images/${item.type}.png" />
          </div>
          <div class="propertie-image">
            <img src=${item.image} />
          </div>
        </div>
        <div class="propertie-item__info">
          <div class="info--name">${item.name}</div>
          <div class="info--address">
          ${item.address}
          </div>
        </div>
      </div>`
      )
      .join("")}
  </div>
  `;
      $("#data-container").html(dataHtml);
    },
  });
});
