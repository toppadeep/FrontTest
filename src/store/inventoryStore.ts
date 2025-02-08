import { defineStore } from "pinia";

// Интерфейс для предмета инвентаря
interface Item {
  id: number;
  image: string;
  amount: number;
}

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    items: [] as Item[],
  }),

  actions: {
    // Инициализация состояния из localStorage
    initialize() {
      const storedItems = localStorage.getItem("items");

      if (storedItems) {
        this.items = JSON.parse(storedItems);
      } else {
        this.items = [
          {
            id: 1,
            image: "https://i.postimg.cc/8Pyby6fx/Green.png",
            amount: 543,
          },
          {
            id: 2,
            image: "https://i.postimg.cc/mZyjHqLL/Blue.png",
            amount: 233,
          },
          {
            id: 3,
            image: "https://i.postimg.cc/xTjRyR8K/Orange.png",
            amount: 556,
          },
          { id: 4, image: "", amount: 0 },
          { id: 5, image: "", amount: 0 },
          { id: 6, image: "", amount: 0 },
          { id: 7, image: "", amount: 0 },
          { id: 8, image: "", amount: 0 },
          {
            id: 9,
            image: "https://i.postimg.cc/8Pyby6fx/Green.png",
            amount: 53,
          },
          {
            id: 10,
            image: "https://i.postimg.cc/mZyjHqLL/Blue.png",
            amount: 30,
          },
          {
            id: 11,
            image: "https://i.postimg.cc/xTjRyR8K/Orange.png",
            amount: 25,
          },
          { id: 12, image: "", amount: 0 },
          { id: 13, image: "", amount: 0 },
          { id: 14, image: "", amount: 0 },
          { id: 15, image: "", amount: 0 },
          { id: 16, image: "", amount: 0 },
          { id: 17, image: "", amount: 0 },
          { id: 18, image: "", amount: 0 },
          { id: 19, image: "", amount: 0 },
          {
            id: 20,
            image: "https://i.postimg.cc/8Pyby6fx/Green.png",
            amount: 15,
          },
          {
            id: 21,
            image: "https://i.postimg.cc/mZyjHqLL/Blue.png",
            amount: 23,
          },
          {
            id: 22,
            image: "https://i.postimg.cc/xTjRyR8K/Orange.png",
            amount: 53,
          },
          { id: 23, image: "", amount: 0 },
          { id: 24, image: "", amount: 0 },
          { id: 25, image: "", amount: 0 },
        ];
        this.saveToLocalStorage();
      }
    },
    swapItems(index1: number, index2: number) {
      [this.items[index1], this.items[index2]] = [
        this.items[index2],
        this.items[index1],
      ];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("items", JSON.stringify(this.items));
    },
    updateItemQuantity(itemId: number, newQuantity: number) {
      const itemIndex = this.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        if (newQuantity > 0) {
          // Обновляем количество
          this.items[itemIndex].amount =
            this.items[itemIndex].amount - newQuantity;
        } else {
          // Удаляем предмет, если количество 0
          this.items.splice(itemIndex, 1);
        }
        this.saveToLocalStorage();
      }
    },
  },
});
