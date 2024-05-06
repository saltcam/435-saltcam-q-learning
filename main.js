const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	ASSET_MANAGER.queueDownload("./assets/Link_Green.png");
	ASSET_MANAGER.queueDownload("./assets/Link_Blue.png");
	ASSET_MANAGER.queueDownload("./assets/Link_Both.png");
	ASSET_MANAGER.queueDownload("./assets/Zelda.png");
	ASSET_MANAGER.queueDownload("./assets/Empty.png");
	ASSET_MANAGER.queueDownload("./assets/Green.png");
	ASSET_MANAGER.queueDownload("./assets/Blue.png");
	ASSET_MANAGER.queueDownload("./assets/Die.png");

	gameEngine.init(ctx);

	gameEngine.start();
});
