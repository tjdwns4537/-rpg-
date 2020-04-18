function logMessage (msg,color){
    if(!color){
        color='black';
    }
    var div = document.createElement('div')
    div.innerHTML=msg;
    div.style.color=color;
    document.getElementById('log').appendChild(div);
}
var battle=false;
var gameover=false;
function Charactor(name,hp,att){
    this.name=name;
    this.hp=hp;
    this.att=att;
}
Charactor.prototype.attacked = function(damage){
    this.hp-=damage;
    logMessage(this.name+"님의체력이"+this.hp+"만큼남았네용")
    if(this.hp<=0){
        battle = false;
    }
}
Charactor.prototype.attack = function ( target ){
    logMessage(this.name+"님이"+target.name+ "을 공격합니다");
    target.attacked(this.att);
}
function Hero(name,hp,att,lev,xp){
    Charactor.apply(this,arguments);
    this.lev=lev||1;
    this.xp=xp||0;
}
Hero.prototype=Object.create(Charactor.prototype);
Hero.prototype.constructor=Hero;

Hero.prototype.attack=function(target){
    logMessage(this.name+"님이"+target.name+"을 공격합니다")
    target.attacked(this.att)
    if(target.hp<=0){
        this.gainXp(target)
    }
}
Hero.prototype.attacked=function(damage){
    this.hp-=damage;
    logMessage(this.name+"님이"+this.hp+'가 남았습니다');
    if(this.hp<=0){
        logMessage(this.name+"님이 죽었습니다."+this.lev+"에서 게임을 다시시작하려면 f5 를 눌러주십시오","red")
        gameover=true;
        battle=false;
    }
}
Hero.prototype.gainXp=function(target){
    logMessage(this.name+'님이 전투에서승리하여'+target.xp+'의 경험치를 얻습니다','blue')
    this.xp+=target.xp;
    if(this.xp> 100 + this.lev*10){
        this.lev++;
        logMessage(this.name+'레벨업!'+this.lev);
        this.hp = 100 + this.lev*10;
        this.xp -= 10 * this.lev+100;
    }
}
function Monster(name,hp,att,lev,xp){
    Charactor.apply(this,arguments)
    this.lev=lev||1;
    this.xp=xp||10;
}
Monster.prototype=Object.create(Charactor.prototype);
Monster.prototype.constructor=Monster;
function MakeMonster(){
    var MonsterArr=[
        ['tico',20,10,1,8],
        ['pulo',50,15,2,10],
        ['opar',90,20,4,12],
        ['mow',150,28,7,14],
        ['nule',200,40,10,16]
    ];
var Monsters = MonsterArr[Math.floor(Math.random()*5)];
return new Monster(Monsters[0],Monsters[1],Monsters[2],Monsters[3],Monsters[4])
}

var hero1 = new Hero(prompt("이름을 입력해줘"),100,10);
logMessage(hero1.name + '님이 모험을 시작합니다. 어느 정도까지 성장할 수 있을까요?');
while(!gameover){
    var monsters=MakeMonster();
    logMessage(monsters.name+'을 마주쳤습니다. 전투시작 !','green')
    battle=true;
    while(battle){
        hero1.attack(monsters)
        if(monsters.hp>0){
            monsters.attack(hero1)
        }
    }
}






