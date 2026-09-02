// 森罗厨房 - 米饭吞碗修复
// 根因：kaleidoscopecookery 注册 cooked_rice 时用了 BowlFoodOnlyItem 双参构造器，
// 碗只被设为 craftRemainder（合成余料），FoodProperties 里漏了 usingConvertsTo，
// 导致吃完不返还碗（其余 26 种碗装食物走单参构造器，自带还碗，不受影响）。
// 这里监听吃完事件补发碗，生存模式对齐原版 Player#eat 的容器返还行为。
ItemEvents.foodEaten('kaleidoscope_cookery:cooked_rice', event => {
  let player = event.player
  if (!player.creative) {
    player.give('minecraft:bowl')
  }
})
