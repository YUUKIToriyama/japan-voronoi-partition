import "../public/style.scss";
import maplibregl from 'maplibre-gl';

const displayMap = (args: { id: string, styleFile: string, center: { lng: number, lat: number } }) => {
	const map = new maplibregl.Map({
		container: args.id,
		style: args.styleFile,
		center: args.center,
		zoom: 10,
		accessToken: ""
	});
	map.addControl(new maplibregl.NavigationControl({}));
	map.addControl(new maplibregl.GeolocateControl({}));
	map.addControl(new maplibregl.FullscreenControl({}));
	map.addControl(new maplibregl.ScaleControl({}));
	return map;
}

const plotPrefCapitals = async () => {
	const endpoint = "https://geolonia.github.io/japanese-prefectural-capitals/";
	const result: Record<string, Record<"lat" | "lng", number>> = await fetch(endpoint).then(response => response.json());
	for (let prefecture of Object.entries(result)) {
		const popup = new maplibregl.Popup({});
		popup.setHTML(`<h3>${prefecture[0]}</h3>`);
		const marker = new maplibregl.Marker();
		marker.setLngLat(prefecture[1]);
		marker.setPopup(popup);
		marker.addTo(map);
	}
	console.log(result);
	console.log(result["北海道"].lat)
}

const map = displayMap({
	id: "myMap",
	styleFile: "https://tile.openstreetmap.jp/styles/osm-bright/style.json",
	center: {
		lat: 35.7980668,
		lng: 136.4041623
	}
})
plotPrefCapitals()