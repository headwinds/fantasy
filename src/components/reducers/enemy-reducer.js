export const reduceEnemy = (context, action) => {
  //context.turnCount++;
  const enemy = context.enemies.find(enemy => enemy.id === action.targetId);
  const enemyIndex = context.enemies.findIndex(
    enemy => enemy.id === action.targetId
  );
  enemy.health = enemy.health - action.damage;
  if (enemy.health <= 0) {
    enemy.health = 0;
    context.enemies.splice(enemyIndex, 1);
  }

  return context;
};

export default {};
