export const min_brightness = 65;

export const color_swatches_list = [
    {color: "#ffb900", id: "#ffb900", label: "Yellow"},
    {color: "#ea4300", id: "#ea4300", label: "Orange"},
    {color: "#d13438", id: "#d13438", label: "Red"},
    {color: "#b4009e", id: "#b4009e", label: "Magenta"},
    {color: "#5c2d91", id: "#5c2d91", label: "Purple"},
    {color: "#0078d4", id: "#0078d4", label: "Blue"},
    {color: "#008272", id: "#008272", label: "Teal"},
    {color: "#107c10", id: "#107c10", label: "Green"},

    {color: "#d29200", id: "#d29200", label: "Dark Yellow"},
    {color: "#d83b01", id: "#d83b01", label: "Dark Orange"},
    {color: "#a4262c", id: "#a4262c", label: "Dark Red"},
    {color: "#5c005c", id: "#5c005c", label: "Dark Magenta"},
    {color: "#32145a", id: "#32145a", label: "Dark Purple"},
    {color: "#002050", id: "#002050", label: "Dark Blue"},
    {color: "#004b50", id: "#004b50", label: "Dark Teal"},
    {color: "#004b1c", id: "#004b1c", label: "Dark Green"},

    {color: "#fff100", id: "#fff100", label: "Light Yellow"},
    {color: "#ff8c00", id: "#ff8c00", label: "Light Orange"},
    //{color: "#d13438", id: "#d13438", label: "Red"},
    {color: "#e3008c", id: "#e3008c", label: "Light Magenta"},
    {color: "#b4a0ff", id: "#b4a0ff", label: "Light Purple"},
    {color: "#00bcf2", id: "#00bcf2", label: "Light Blue"},
    {color: "#00B294", id: "#00B294", label: "Light Teal"},
    {color: "#bad80a", id: "#bad80a", label: "Light Green"},
    {color: "#ffffff", id: "#ffffff", label: "White"}
];

let mapped = {};

for (let swatch of color_swatches_list) {
    mapped[swatch.id] = {label: swatch.label};
}

export const color_swatches_map = mapped;

interface ColorRGBA {
    r: number
    g: number
    b: number
    a?: number
}

export function getColorFromHexString(hex_color: string): ColorRGBA {
    let substring = null;

    if (hex_color.length > 0 && hex_color[0] === "#") {
        substring = hex_color.substring(1);
    } else {
        return null;
    }

    let rgb = 0;

    if (substring.length === 6) {
        rgb = parseInt(substring, 16);
    } else if (substring.length === 3) {
        rgb = parseInt(
            substring[0] + substring[0] +
            substring[1] + substring[1] +
            substring[2] + substring[2],
            16
        );
    } else {
        return null;
    }

    let r = (rgb >> 16) & 0xff;
    let g = (rgb >>  8) & 0xff;
    let b = (rgb >>  0) & 0xff;

    return { r, g, b, a: null };
}

export function getBrightness(hex_color: string): number {
    let rgba = getColorFromHexString(hex_color);

    if (rgba == null) {
        return null;
    }

    return 0.2126 * rgba.r + 0.7152 * rgba.g + 0.0722 * rgba.b;
}

export function getBrightnessAlt(hex_color: string): number {
    let rgba = getColorFromHexString(hex_color);

    if (rgba == null) {
        return null;
    }

    return 0.299 * rgba.r  + 0.587 * rgba.g + 0.114 * rgba.b;
}

export function getBrightnessAltAlt(hex_color: string): number {
    let rgba = getColorFromHexString(hex_color);

    if (rgba == null) {
        return null;
    }

    return Math.sqrt(0.299 * (rgba.r ** 2) + 0.587 * (rgba.g ** 2) + 0.114 * (rgba.b ** 2));
}