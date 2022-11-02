import axios from "axios";
import { JSDOM } from "jsdom";

async function getFlats() {
  const links = [];
  const flats = [];
  let html;

  try {
    const { data } = await axios.get(
      "https://www.domiporta.pl/mieszkanie/wynajme/mazowieckie/warszawa?RowsPerPage=12&SortingOrder=InsertionDate"
    );

    html = data;
  } catch (error) {
    return console.log(error);
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const items = document.querySelectorAll(".sneakpeak");

  items.forEach((item) => {
    const link = "https://www.domiporta.pl" + item.getAttribute("data-href");
    links.push(link);
  });

  for (const link of links) {
    try {
      const splitLink = link.split("/");
      const flatID = Number(splitLink[splitLink.length - 1]);
      const { data } = await axios.get(link);
      html = data;
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const photos = [];

      document
        .querySelectorAll(".gallery__container-slider__item img")
        .forEach((el) => {
          photos.push(el.src);
        });

      const flat = {
        flatID,
        link,
        title: document
          .querySelector(".summary__subtitle-2")
          .textContent.replace(/\s+/g, " ")
          .trim(),
        price: document
          .querySelector(".summary__price_number span")
          .textContent.replace(/\s+/g, " ")
          .trim(),
        space: document
          .querySelector(".features-short__value-quadric")
          .textContent.replace(/\s+/g, " ")
          .trim(),
        rooms: document
          .querySelector(
            ".features-short div div:nth-child(3) div div p:last-child"
          )
          .textContent.replace(/\s+/g, " ")
          .trim(),
        // phone: document.querySelector("js-details-phone-number").dataset.tel,
        location: document
          .querySelector(".summary__location-2")
          .textContent.replace(/\s+/g, " ")
          .trim(),
        photos,
      };

      flats.push(flat);
    } catch (error) {
      return console.log(error);
    }
  }

  return flats;
}

export default getFlats;
