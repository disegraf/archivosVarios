var Carga = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize: function Carga() {
		Phaser.Scene.call(this, {
			key: 'carga',
			active: true
		});
	},

	preload: function () {
		this.load.image('logo', 'img/logo-02.png');
		this.load.image('background', 'img/background-2.jpg');
		this.load.image('buttonFull', 'img/icon-fullscreen-2.png');
		//dog1
		this.load.json('jsonAnimDog1','img/dog1/dog1_anim.json');
		this.load.atlas('dog1'/*<-el nombre debe ser el key del archivo jason "key": "firstanimation" o sino no funciona*/,'img/dog1/dog1.png','img/dog1/dog1_atlas.json');
		//dog1

		canvasGame = $("#phaser-container canvas");
		/**********************************************/
		/*preload*/
		/**********************************************/
		var bg = this.add.graphics();
		bg.fillStyle(0x000000, 1);
		bg.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

		var textoCarga = this.add.text((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 30, 'cargando...').setOrigin(0.5);
		textoCarga.setFontSize(12);
		textoCarga.setFontFamily('Helvetica, Arial');

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();

		this.load.on('progress', function (value) {
			console.log(value);

			progressBox.clear();
			progressBox.fillStyle(0x222222, 0.8);
			progressBox.fillRect((25 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) - 20, (50 * canvasGame.width() / 100), 20);

			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			var widthBar = (50 * canvasGame.width() / 100) - 8;
			progressBar.fillRect((25 * canvasGame.width() / 100) + 4, (50 * canvasGame.height() / 100) - 16, (widthBar * value), 12);

			textoCarga.setPosition((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 10);
			textoCarga.setText('cargando...' + parseInt(value * 100) + "%");
		});

		this.load.on('fileprogress', function (file) {
			//console.log(file.src);
		});

		this.load.on('complete', function () {
			console.log('complete');
			progressBar.destroy();
			progressBox.destroy();
			textoCarga.destroy();
		});

		/**********************************************/
		/*preload*/
		/**********************************************/




	},

	create: function () {

		/*centro del escenario*/
		var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.logo = this.add.image(0, 0, 'logo').setScale(1).setOrigin(0.5).setPosition(screenCenterX, screenCenterY);
		this.logo.alpha = 0;

		//agregando efecto de intro
		this.tweens.add({
			targets: this.logo,
			duration: 2500,
			alpha: 1,
			repeat: 0,
			yoyo: true,
			ease: 'Power1',
			onStart: () => console.log("iniciando Animacion"),
			onComplete: function () {
				game.scene.start('juego');
				game.scene.remove('carga');
			}
		});

		this.scale.on('resize', function (gameSize) {
			screenCenterX = canvasGame.width() / 2;
			screenCenterY = canvasGame.height() / 2;
			this.logo.setPosition(screenCenterX, screenCenterY);
		}, this);

	},
	update: function (time, delta) {


	}

});