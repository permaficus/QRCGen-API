# QR Codes Generator - API

Free and open-source, QRCGen-API is a simplified version of the typical QRcode generator. Can be used for all purposes. Users simply deploy this app or service on their backend and can immediately consume this API on their frontend

## Endpoint

> POST /api/v1/generate

<details>
<summary>POST Body Request Attribute (Minimum)</summary>

```json
{
    "payload": {
        "text": "{{$randomString}}",
        "output": "dataURL"
    },
    "options": {
        "type": "png",
        "errorCorrectionLevel": "M"
    },
    "renderOptions": {
        "quality": 80
    }
}
```

</details>

## Attribute Descriptions

| Props | Key | Descriptions | Required |
| ----- | --- | ------------ | -------- |
| payload | `text` `output` | `text`: key for generating qr code, `output`: can be file/image or base64file format. valid value (`dataURL`, `file`) | Required |
| | `text` | type: `String` | Required |
| | `output` | type: `String` | Required |
| options | `version` | type: `Number` | Optional |
| | `errorCorrectionLevel` | type: `String` default: `M` | Required |
| | `maskPattern` | type: `Any` | Optional |
| | `scale` | type: `Number` | Optional |
| | `margin` | type: `Number` default: 4 | Optional |
| | `small` | type: `Boolean` default: `False` | Optional |
| | `color` | consist of 2 key: `dark` and `light` area. Both type are `String` | Optional |
| | `width` | type: `Number` | Optional
| | `type` | type: `Any` valid: `svg` and `png` | Required
| renderOptions | `quality` | type: `Number` | Required
| | `deflateLEvel` | type: `Any` | Optional |
| | `deflateStrategy` | type: `Any` | Optional |
| | | Both `defalateLevel` and `deflateStrategy` only works with PNG `type` options

## Response (200 - OK)

<details>
<summary>POST - Generate (Output Type: File)</summary>

```json
{
    "status": "OK",
    "code": 200,
    "result": {
        "image": "http://www.hostname.app/qrcodes/418cf9c5cde379f121ee.png",
        "download_link": "http://www.hostname.app/api/v1/download/418cf9c5cde379f121ee.png"
    }
}
```

</details>

<summary>POST - Generate (Output Type: dataURL / base64file)</summary>

```json
{
    "status": "OK",
    "code": 200,
    "base64file": "{{base64 encoded file}}"
}
```

</details>