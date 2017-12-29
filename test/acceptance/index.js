/* eslint no-undef: "off" */
import { Selector } from 'testcafe';

fixture('Placard').page('http://localhost:1337/demo/placard/index.html');

test('The placard div is visible and has one or more placards.', async t => {
    await t.switchToIframe(new Selector('iframe').nth(1));
    const placardDiv = await new Selector('#container > div').exists;
    await t.expect(placardDiv).ok();
    const placards = await new Selector('#container > div > div > div.recordsDiv > div.placardDiv');
    await t.expect(placards.count).gte(1);
});
