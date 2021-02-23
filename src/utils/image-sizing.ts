import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";

export enum ImageSizing
{
    Stretch = 1,
    Cover = 2,
    Contain = 3,
    KeepLower = 4,
    KeepHigher = 5,
    Center = 6,
}

export function imageResize(srcSize: vec2, dstSize: vec2, sizing: ImageSizing): [Rect, Rect]
{
    let srcRect = new Rect(vec2.zero(), srcSize);
    let dstRect = new Rect(vec2.zero(), dstSize);
    if (srcSize.x < dstSize.x)
    {
        switch (sizing)
        {
            case ImageSizing.Center:
                const delta = dstSize.x - srcSize.x;
                dstRect.min.x += delta / 2;
                dstRect.max.x -= delta / 2;
                break;
            case ImageSizing.KeepHigher:
                dstRect.min.x = dstSize.x - srcSize.x;
                break;
            case ImageSizing.KeepLower:
                dstRect.max.x = srcSize.x;
                break;
        }
    }
    else if (srcSize.x > dstSize.x)
    {
        switch (sizing)
        {
            case ImageSizing.Center:
                const delta = srcSize.x - dstSize.x;
                srcRect.min.x += delta / 2;
                srcRect.max.x -= delta / 2;
                break;
            case ImageSizing.KeepHigher:
                srcRect.min.x = srcSize.x - dstSize.x;
                break;
            case ImageSizing.KeepLower:
                srcRect.max.x = dstSize.x;
                break;
        }
    }

    if (srcSize.y < dstSize.y)
    {
        switch (sizing)
        {
            case ImageSizing.Center:
                const delta = dstSize.y - srcSize.y;
                dstRect.min.y += delta / 2;
                dstRect.max.y -= delta / 2;
                break;
            case ImageSizing.KeepHigher:
                dstRect.min.y = dstSize.y - srcSize.y;
                break;
            case ImageSizing.KeepLower:
                dstRect.max.y = srcSize.y;
                break;
        }
    }
    else if (srcSize.y > dstSize.y)
    {
        switch (sizing)
        {
            case ImageSizing.Center:
                const delta = srcSize.y - dstSize.y;
                srcRect.min.y += delta / 2;
                srcRect.max.y -= delta / 2;
                break;
            case ImageSizing.KeepHigher:
                srcRect.min.y = srcSize.y - dstSize.y;
                break;
            case ImageSizing.KeepLower:
                srcRect.max.y = dstSize.y;
                break;
        }
    }

    if (sizing === ImageSizing.Contain)
    {
        let srcAspectRatio = srcSize.x / srcSize.y;
        let dstAspectRatio = dstSize.x / dstSize.y;

        // Source wider than destination
        // Shrink destination viewport height
        if (srcAspectRatio > dstAspectRatio)
        {
            const delta = dstSize.y - srcSize.y * (dstSize.x / srcSize.x);
            dstRect.min.y += delta / 2;
            dstRect.max.y -= delta / 2;
        }
        // destination wider than source
        // Shrink destination viewport width
        else
        {
            const delta = dstSize.x - srcSize.x * (dstSize.y / srcSize.y);
            dstRect.min.x += delta / 2;
            dstRect.max.x -= delta / 2;
        }
    }
    else if (sizing === ImageSizing.Cover)
    {
        let srcAspectRatio = srcSize.x / srcSize.y;
        let dstAspectRatio = dstSize.x / dstSize.y;

        // Source wider than destination
        // shrink source rect with
        if (srcAspectRatio > dstAspectRatio)
        {
            const delta = srcSize.x - dstSize.x * (dstSize.y / srcSize.y);
            srcRect.min.x += delta / 2;
            srcRect.max.x -= delta / 2;
        }
        // destination wider than source
        // Shrink source rect height
        else
        {
            const delta = srcSize.y - dstSize.y * (dstSize.x / srcSize.x);
            srcRect.min.y += delta / 2;
            srcRect.max.y -= delta / 2;
        }
    }

    return [srcRect, dstRect];
}