export class Player {
    constructor(name, health, attack, defense){
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    speakName() {
        return this.name
    }

    displayHealth() {
        return this.health;
    }

    returnStats() {
        return [this.health, this.attack, this.defense];
    }

    takeDamage(damage) {
        let incoming = damage - this.defense;
        if(incoming <= 0) {
            console.log("No damage Recieved");
        } else {
            this.health = this.health - incoming;
            return this.displayHealth();
        }
    }

    dealDamage(){
        return this.attack * ( Math.floor(Math.random()*(100-60)+60) / 100);
    }
}

export class Enemy {
    constructor(name, health, attack, defense){
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    speakName() {
        return this.name
    }

    displayHealth() {
        return this.health;
    }

    takeDamage(damage) {
        let incoming = damage - this.defense;
        if(incoming <= 0) {
            return "No damage Recieved";
        }
        this.health = this.health - incoming;
        return this.displayHealth();
    }

    dealDamage(){
        return this.attack * ( Math.floor(Math.random()*(100-60)+60) / 100 );
    }
}

export const combat = (entity1, entity2) => {
    let combatLog = [];
    let fight = true;
    while(fight){
        let tempHP1 = entity1.displayHealth();
        let tempHP2 = entity2.displayHealth();
        if( entity1.displayHealth() <= 0 ){
            combatLog.push("The winner is " + entity2.speakName() + ". Better luck next time, YOU LOSE.");
            fight = false;
        } else if ( entity2.displayHealth() <= 0 ){
            combatLog.push("The winner is " + entity1.speakName()+ ". Not even close baby.");
            fight = false;
        } else {
            entity1.takeDamage(Math.floor(entity2.dealDamage()));
            if(entity2.displayHealth() > 0){
                entity2.takeDamage(Math.floor(entity1.dealDamage()));
            }
            combatLog.push(`${(tempHP1 - entity1.displayHealth()).toFixed(1)}/${(tempHP2 - entity2.displayHealth()).toFixed(1)}`);
        }
    }
    return combatLog;
}
