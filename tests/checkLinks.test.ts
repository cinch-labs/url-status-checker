import {Link} from "../src/schema";
import {checkAllLinks} from "../src/link";

const urls: Link[] = [
  {
    url: 'https://example.com',
    statusCode: 200,
    method: 'GET',
  }
]

test('checkAllLinks()', async () => {
  await expect(checkAllLinks(urls)).resolves.toStrictEqual([{
    url: 'https://example.com',
    success: true
  }])
})
