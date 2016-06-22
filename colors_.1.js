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

    function copy_hsl(hsl){
        return make_hsl(hsl.h, hsl.s, hsl.l);
    }
    
    function invert(hsl){
        var hsl = copy_hsl(hsl);
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
        return color;
    }
    
    function relative_color(delta_color, color) {
        //Takes an angle and an hsl object, returns a color
        var hsl = copy_hsl(color.hsl);
        hsl.h = ( hsl.h + delta_color.h ) % 360;
        if (hsl.h < 0) {
            hsl.h += 360;
        }
        
        hsl.s = hsl.s + delta_color.s;
        if (hsl.s > 1) {
            hsl.s = 1;
        } else if (hsl.s < 0) {
            hsl.s = 0;
        }
        
        hsl.l = hsl.l + delta_color.l;
        if (hsl.l > 1) {
            hsl.l = 1;
        } else if (hsl.l < 0) {
            hsl.l = 0;
        }
        
        return make_color(hsl);
    }

    function make_five() {
        var base_color = random_color(),
            pattern = make_hsl(25, 0, .05),
            other_pattern = make_hsl(-25, 0, .05),
            colors = [undefined, undefined, base_color, undefined, undefined];
        console.log(colors);
        colors[1] = (relative_color(other_pattern, colors[2])); //2      
        colors[0] = (relative_color(other_pattern, colors[1])); //1
        colors[3] = (relative_color(pattern, colors[2])); //1
        colors[4] = (relative_color(pattern, colors[3])); //2
        return colors;
    }
    
    var colors = {
        random : random_color,
        relative_color : relative_color,
        invert : invert,
        make_five : make_five
    };

    return colors;
}());