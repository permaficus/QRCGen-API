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

<details>
<summary>POST - Generate (Output Type: dataURL / base64file)</summary>

```json
{
    "status": "OK",
    "code": 200,
    "result": {
        "base64file: "{{base64-string}}
    }
}
```

> base64 file example

```shell
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATMSURBVO3BQY4cSRIEQdNA/f/Lujz6KYBEejV7uCaCf6RqyUnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXok5eA/CQ1bwC5UXMD5EbNDZBJzQ2Qn6TmjZOqRSdVi06qFn2yTM0mIE8AmdRMat5QcwPkRs0bajYB2XRSteikatFJ1aJPvgzIE2qeADKpeQLIpGYCMqmZgDwB5EbNE0CeUPNNJ1WLTqoWnVQt+uQfB+RGzY2aGzVvAPmXnFQtOqladFK16JN/DJAngLyh5g01/5KTqkUnVYtOqhZ98mVqfhM1N0DeAHKjZpOa3+SkatFJ1aKTqkWfLAPyN6mZgNwAmdRMQCY1E5BJzQTkBsik5gbIb3ZSteikatFJ1SL8I/9hQG7UTECeUDMBmdRMQCY1E5AbNf9lJ1WLTqoWnVQt+uQlIJOaCcgmNZOaN9TcAHlCzQRkUvMEkE1qvumkatFJ1aKTqkX4R34QkEnNE0Bu1NwAuVHzmwB5Q80NkEnNGydVi06qFp1ULfrky4A8AeRGzQRkAjKpmdRMQJ4A8oaaCciNmgnIpOYGyE86qVp0UrXopGrRJ8uATGomIDdq3lCzCcik5g0gk5oJyARkUjMBmdRMan7SSdWik6pFJ1WLPnkJyA2QJ4DcqJnUTEBu1ExqbtRMQCY1T6iZgExqJiBvALlRs+mkatFJ1aKTqkWf/DA1E5AbNTdAbtRMQCY1E5AngExqnlBzo+YNNROQbzqpWnRSteikatEnX6ZmAjKpmYBMQCY1N2omIJOaCcgTam6A3Ki5ATKpmYBMaiYgN2q+6aRq0UnVopOqRfhHfhCQGzU3QCY1N0DeUDMBmdQ8AeRGzQRkUjMBmdT8TSdVi06qFp1ULfrkh6m5AfKT1NwAuQHyhJoJyI2aGzVPALlR88ZJ1aKTqkUnVYs+eQnIpGYC8oaaCcgEZFIzqZmAPKFmAnKjZgLyBJBJzQTkRs2NmgnIppOqRSdVi06qFn3yZWomIE8AeQLIpGZS801AboBMat5QMwG5UfNNJ1WLTqoWnVQt+uTLgExqboBMaiYgm4BMaiYgN2qeAHID5EbNBGRScwNkUrPppGrRSdWik6pFn/wwIJOaSc0E5A0gk5on1ExAngAyqZmAPAHkNzupWnRSteikatEnL6m5UfOGmhsgk5o3gPxNap4A8pucVC06qVp0UrXok5eA/CQ1k5ongExqJiBPAPkmIJOaGyB/00nVopOqRSdViz5ZpmYTkBsgk5obNROQGzUTkEnNN6l5Q81POqladFK16KRq0SdfBuQJNZuAPKFmAnIDZBOQTUBu1Gw6qVp0UrXopGrRJ/9n1DyhZgIyqXkCyBNqNgH5ppOqRSdVi06qFn3yjwEyqZmAPKHmCSCTmknNDZAJyKRmAjKpmYD8pJOqRSdVi06qFn3yZWq+Sc0EZAIyqXlDzQRkUjMBmdRMQCY1N0AmNROQGzXfdFK16KRq0UnVok+WAflJQCY1E5AJyBNqJiCTmgnIpOZGzQTkRs0E5EbNBGRSs+mkatFJ1aKTqkX4R6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYv+B8FdIlxQzrfxAAAAAElFTkSuQmCC
```

</details>