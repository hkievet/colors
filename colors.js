window.colors = (function() {
    function get_hex(color_value){
        //returns "00" to "FF"
        var hex = color_value.toString(16);
        if ( hex.length == 1 ) {
            hex = "0" + hex;
        }
        return hex;
    }
    
    function make_hsl(h, s, l){
        var hsl = {h:h, s:s, l:l};
        return hsl;
    }

    function copy_hsl(color){
        return make_hsl(color.hsl.h, color.hsl.s, color.hsl.l);
    }
    
    function invert(color){
        var hsl = copy_hsl(color);
        hsl.h = (hsl.h + 180) % 360;
        return make_color(hsl);
    }
    
    function make_color(hsl){
        var chroma = (1 - Math.abs( 2 * hsl.l - 1 ) ) * hsl.s,
            _h = ( hsl.h / 60 ),
            x = chroma * ( 1 - Math.abs( _h % 2 - 1)),
            r = 0, g = 0, b = 0, 
            m = hsl.l - chroma / 2;    
        switch (Math.floor(_h)) {
            case 0:
                r = chroma;
                g = x;
                break;
            case 1:
                r = x;
                g = chroma;
                break;
            case 2:
                g = chroma;
                b = x;
                break;
            case 3:
                g = x;
                b = chroma;
                break;
            case 4:
                b = chroma;
                r = x;
                break;
            case 5:
                b = x;
                r = chroma;
                break;
            default:
                alert("Failed to make color");
                return undefined;
        }
        var convert_color = function (c, m) { return get_hex( Math.floor( ( c + m ) * 255) ); };
        var c = "#" + convert_color(r, m) + convert_color(g, m) + convert_color(b, m);
        var color = {hsl:hsl, color: c};
        return color;
    }
    
    function random_color() {
        var hue = Math.random() * 360,
            saturation = (Math.random() + 1 ) / 2,
            lightness = .5,
            hsl = make_hsl(hue, saturation, lightness),
            color = make_color(hsl);
        console.log(hsl);
        return color;
    }
    
    function relative_color(delta_angle, color) {
        //Takes an angle and an hsl object, returns a color
        var hsl = make_hsl(color.hsl.h, color.hsl.s, color.hsl.l);
        hsl.h = ( hsl.h - delta_angle ) % 360;
        if (hsl.h < 0) {
            hsl.h += 360;
        }
        return make_color(hsl);
    }
    
    var colors = {
        random : random_color,
        relative_color : relative_color,
        invert : invert
    };
    
    return colors;
}());