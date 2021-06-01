(function () {

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMmJiOTM0NC01MGQ1LTQ4NzctYWU5NS1hN2FhYzVlZjI0ZTQiLCJpZCI6NDQzMjcsImlhdCI6MTYxMzg1MzU1OX0.1UAaSvwiTrgLzmhGOfB6DuxCqm9im_xw8wBi6e2yXsA';

    var viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        selectionIndicator: false,
        baseLayerPicker: false,
    });
    viewer.imageryLayers.remove(viewer.imageryLayers.get(0));


    var tileset = new Cesium.Cesium3DTileset({
        url: "./Source/SampleData/tunistiled3d/tileset.json",
    });
    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(tileset);

    var heightStyle = new Cesium.Cesium3DTileStyle({
        color : {
            conditions : [
                ["${height} <= 10 ", "color('yellow')"],
                ["${height} >= 15 && ${height} < 30", "color('green')"],
                ["${height} >= 20 && ${height} < 40", "color('blue')"],
                ["${height} > 30", "color('purple',0.9)"],

                ["true", "color('white')"],
            ]
        }
    });
    var typeStyle = new Cesium.Cesium3DTileStyle({
        color : {
            conditions : [
                ["${building} === 'university'", "color('green')"],
                ["${building} === 'office' ", "color('blue')"],
                ["${building} === 'house' ", "color('lightgreen')"],
                ["${building} === 'apartements' ", "color('red')"],
                ["true", "color('white')"],
            ]
        },
        show : true
    });
    // Define a white, transparent building style
    var transparentStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white')",
        show : true
    });
    var topModeElement = document.getElementById('heightMode');
    var buildModeElement = document.getElementById('buildMode');
    var normalModeElement = document.getElementById('normalMode');

    // Create a follow camera by tracking the drone entity
    function setViewMode() {
        if (topModeElement.checked) {
            tileset.style = heightStyle;

        }else if(buildModeElement.checked) {
            tileset.style = typeStyle;
        }
        else {
            tileset.style = transparentStyle;
        }
    }
    topModeElement.addEventListener('change', setViewMode);
    buildModeElement.addEventListener('change', setViewMode);
    normalModeElement.addEventListener('change', setViewMode);

}());
