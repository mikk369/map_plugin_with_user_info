# WordPress Map with Leaflet and MapTiler Tiles

This plugin integrates Leaflet.js with MapTiler tiles to display custom maps in your WordPress site. It allows you to easily add interactive maps to posts, pages, or widgets.

## Features

- **Leaflet Integration**: Easy integration of Leaflet.js, a popular open-source JavaScript library for mobile-friendly interactive maps.
- **MapTiler Tiles**: Seamless integration with MapTiler’s custom tile layers for high-quality map visuals.
- **Custom Markers**: Add custom markers to your map to highlight specific locations.
- **Shortcode Support**: Insert maps using WordPress shortcodes for flexibility.

## Adding the Calendar to Your React App

1. Clone the repository:
   ```bash
   git clone https://github.com/mikk369/map_plugin_with_user_info.git
   ```
2. Navigate to the project directory:
   ```bash
   cd map_plugin_with_user_info
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

2. **Add Your MapTiler API Key**
   - You’ll need a MapTiler account and API key to use their map tiles.
   - Visit [MapTiler](https://www.maptiler.com/) to create an account and obtain your API key.
   - In the plugin settings, enter your MapTiler API key under **Map Settings**.

## Settings

- **API Key**: Input your MapTiler API key to load map tiles.
- **Default Location**: Set the default map center coordinates (latitude and longitude).
- **Zoom Level**: Adjust the default zoom level (1-18).

## Customization

You can easily customize the map’s appearance by modifying the default Leaflet.js options or adding additional Leaflet layers and markers using JavaScript. Add custom JS through the plugin settings or your theme's custom JS section.

## Changelog

### Version 1.0
- Initial release with basic Leaflet and MapTiler tile support.
