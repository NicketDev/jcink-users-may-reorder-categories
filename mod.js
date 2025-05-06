// Copyright (c) 2025 Nicket, https://github.com/NicketDev
// Licensed under the MIT License. See LICENSE file in the project root for details.

const cacheKey = 'categoryOrder';
const categories = Array.from(document.querySelectorAll(".category"));
const categoriesById = categories.reduce((acc, category) => acc.set(category.id, category), new Map());
categories.forEach(c => c.style.viewTransitionName = `category-${c.id}`);
const categoriesContainer = categories[0].parentNode.insertBefore(Object.assign(document.createElement("div"), {
  id: "categories",
}), categories[0]);
const getOrder = () => {
  const defaultOrder = categories.map(category => category.id);
  let currentOrder = localStorage.getItem(cacheKey) ? JSON.parse(localStorage.getItem(cacheKey)) : defaultOrder;
  const orderWithoutRemoved = currentOrder.filter(id => categoriesById.has(id));
  const newlyAddedCats = defaultOrder.filter(id => !orderWithoutRemoved.includes(id));
  const updatedCurrentOrder = [...orderWithoutRemoved, ...newlyAddedCats];
  return updatedCurrentOrder;
}
let currentOrder = getOrder();
const applyOrder = (order) => {
  for(const id of order) {
    const category = categoriesById.get(id);
    if(category) {
      categoriesContainer.appendChild(category);
    }
  }
}
applyOrder(currentOrder);
window.addEventListener("storage", (e) => {
  if(e.key === cacheKey || e.key === null) {
    const newOrder = getOrder();
    if(JSON.stringify(newOrder) !== JSON.stringify(currentOrder)) {
      currentOrder = newOrder;
      applyOrder(currentOrder);
    }
  }
});
categories.forEach(category => {
  const maintitle = category.querySelector('.maintitle');
  maintitle.draggable = true;
  maintitle.addEventListener('dragstart', (e) => {
    category.classList.add('dragging');
  });
  maintitle.addEventListener('dragend', () => {
    const a = () => {
      const target = document.querySelector(".category.target");
      if(target) {
        const location = target.classList.contains("target-above") ? "beforebegin" : "afterend";
        target.insertAdjacentElement(location, category);
        const newOrder = Array.from(document.querySelectorAll(".category")).map(category => category.id);
        localStorage.setItem(cacheKey, JSON.stringify(newOrder));
        target.classList.remove("target");
        target.classList.remove("target-above");
        target.classList.remove("target-below");
      }
      category.classList.remove('dragging');
    };
    document.startViewTransition ? document.startViewTransition(a) : a();
  });
  category.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggingCategory = document.querySelector('.dragging');
    if(draggingCategory && draggingCategory !== category) {
      const rect = category.getBoundingClientRect();
      const yPercentageRelativeToTarget = (e.clientY - rect.top) / rect.height;
      if(yPercentageRelativeToTarget < 0.5) {
        category.classList.add("target-above");
        category.classList.remove("target-below");
      } else {
        category.classList.add("target-below");
        category.classList.remove("target-above");
      }
    }
  });
  category.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggingCategory = document.querySelector('.dragging');
    if(draggingCategory && !category.classList.contains("target")) {
      category.classList.add('target');
    }
  });
  category.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = category.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return;
    category.classList.remove('target');
    category.classList.remove('target-above');
    category.classList.remove('target-below');
  });
});
