var Neum = window.Neum || {};
Neum.Context = Neum.Context || {};

(function() {
	Neum.Context.mouseHelper = new Neum.MouseHelper();
	Neum.Context.geomHelper = new Neum.GeomHelper();
	Neum.Context.durationHelper = new Neum.DurationHelper();
	Neum.Context.freezeTimer = new Neum.DurationHelper();
	Neum.Context.soundHelper = new Neum.SoundHelper();
	
	Neum.Context.score = 0;
	Neum.Context.currentLevel = 1;
	
	Neum.Context.levels = new Array();
	Neum.Context.levels[1] = new Neum.Level(1000);
	Neum.Context.levels[2] = new Neum.Level(900);
	Neum.Context.levels[3] = new Neum.Level(700);
	Neum.Context.levels[4] = new Neum.Level(500);
	Neum.Context.levels[5] = new Neum.Level(250);

	Neum.Context.playerInfos = {
		score: new Array(5),
		pseudo: "Player"
	};	
})();
