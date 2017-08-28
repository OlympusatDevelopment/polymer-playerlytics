# Playerlytics Player
Playerlytics is a player polymer component wrapper 

## Getting started
1. From Command Line run `npm i -S polymer-playerlytics`
2. If you're installing thi sin WordPRess, just install it in your theme folder. You may have to `npm init` there if you don't already have a package.json file set up.


## Usage
Everything you need is in this package to make it easier to use in non-bower projects. I think...

1. In your ```<head>``` tag, add this for regular sites: 
```
    <script src="node_modules/playerlytics-player/src/bower_components/webcomponentsjs/webcomponents-loader.js"></script>

    <link href="node_modules/playerlytics-player/src/playerlytics-player.html" rel="import">
```

And this on WordPress sites (in header.php):
```
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/node_modules/playerlytics-player/src/bower_components/webcomponentsjs/webcomponents-loader.js"></script>

    <link href="<?php echo get_stylesheet_directory_uri(); ?>/node_modules/playerlytics-player/src/playerlytics-player.html" rel="import">
```

2. Now that we've imported the webcomponents polyfill and linked to the playerlytics-player.html file, we can use the custom component in our html files.
```
    <!-- zmSKL1B1q-c   CMNry4PE93Y -->
    <playerlytics-player video-id="zmSKL1B1q-c" youtube></playerlytics-player> 
```



