SceneManager.initSteamworks = function() {}
SceneManager.steamworksInitialized = function() { return true; }

SteamManager.saveTextToCloud = function() {}
SteamManager.readTextFromCloud = function() {}
SteamManager.isCloudSyncEnabledForUser = function() {}
SteamManager.isCloudEnabled = function() {}
SteamManager.enableCloud = function() {}
SteamManager.getCloudQuota = function() {}

Game_System.prototype.getSteamUserObject = function() { return null; }
Game_System.prototype.getSteamName = function() { return "User"; }
Game_System.prototype.getSteamLevel = function() { return 0; }
Game_System.prototype.getSteamAccountId = function() { return 0; }
Game_System.prototype.getSteamStaticAccountId = function() { return 0; }
Game_System.prototype.getCachedSteamUser = function() { return null; }
Game_System.prototype.unlockAchievement = function() {}
Game_System.prototype.forceUnlockAllAchievements = function() {} // trolled
Game_System.prototype.getAchievements = function() { return []; }
Game_System.prototype.getNumberOfAchievements = function() { return 0; }
Game_System.prototype.clearAchievement = function() {}
Game_System.prototype.getAchievement = function() {}
Game_System.prototype.getCurrentGameLanguage = function() { return "en_US"; }
Game_System.prototype.getNumberOfPlayers = function() {}
Game_System.prototype.activateGameOverlay = function() { return true; }
Game_System.prototype.isGameOverlayEnabled = function() { return false; }
Game_System.prototype.activateGameOverlayToWebpage = function() { window.open(url); }
Game_System.prototype.onAchievementUnlocked = function() {}
Game_System.prototype.onAchievementCleared = function() {}

const _window_navigator_plugins_namedItem = window.navigator.plugins.namedItem;
window.navigator.plugins.namedItem = function(name) {
    // hide the native client leaf
    if (name === 'Native Client') return null;
    else return _window_navigator_plugins_namedItem.call(this, name);
}

Scene_OmoriFile.prototype.saveGame = function() {
    // On Before Save
    $gameSystem.onBeforeSave();
    // Get Save File ID
    var saveFileid = this.savefileId();
    // Get File Window
    var fileWindow = this._fileWindows[this._saveIndex];
    // Save Game
    if (DataManager.saveGame(saveFileid)) {
    SoundManager.playSave();
    StorageManager.cleanBackup(saveFileid);
    var world;
    if($gameSwitches.value(448) && $gameSwitches.value(447)) {
        world = 449 // Special Flag When both the switches are on;
    }
    else if ($gameSwitches.value(448)) {
        world = 448;
    } else if ($gameSwitches.value(447)) {
        world = 447;
    } else if ($gameSwitches.value(446)) {
        world = 446;
    } else if ($gameSwitches.value(445)) {
        world = 445;
    } else if ($gameSwitches.value(444)) {
        world = 444;
    } else {
        world = 0
    }
    DataManager.writeToFileAsync(world.toString(), "TITLEDATA", () => {
        fileWindow.refresh();
        // Deactivate Prompt Window
        this._promptWindow.deactivate();
        this._promptWindow.close();
        // Set Can select Flag to false
        this._canSelect = true;
        // Update Save Index Cursor
        this.updateSaveIndexCursor();
    });
    //   console.log(world); 
    } else {
    SoundManager.playBuzzer();
    // Deactivate Prompt Window
    this._promptWindow.deactivate();
    this._promptWindow.close();
    // Set Can select Flag to false
    this._canSelect = true;
    // Update Save Index Cursor
    this.updateSaveIndexCursor();
    };
};
