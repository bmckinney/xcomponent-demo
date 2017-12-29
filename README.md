EBSCO xcomponent library
---------------

A component library that allows you to inject EBSCO react components into any web page.

It uses PayPal's [xcomponent](https://github.com/krakenjs/xcomponent) - a cross-domain component 
library which helps you render iframes, pass down props, accept callbacks, and more. 


Adding a new React component
-----------

1. Add the new React component files to the `/src` directory

2. Add any new dependencies via `npm install -S my-new-library`

3. Create the **component definition** (js or jsx)

   This is shared between the parent page and the child frame and mirrors the props required by the new component. 

   Use `./src/placard/xcomponents/placardXComponent.jsx` as a template.

4. Create the **component implementation**  (html)

   This is the code that lives inside the child frame, and makes the component work. It has access to all of the props passed down to the component, and it's responsible for calling the correct callbacks when it’s done. Essentially, the entire web-app inside the iframe functions as a component.

   Use `./src/placard/xcomponents/placard.html` as a template.
   
5. Create the **component integration** (html)

   This is a demo html page that renders the component, passing down all of the props the component needs to function.

   Use `./demo/placard/index.html` as a template. Be sure to set: `env: 'demo'`
   
   Add a copy of the component implementation to the demo as well as any necessary css files.

6. Rebuild the project

   ```bash
   npm run clean
   npm run build
   ```
   
7. Run the demo and test your component locally before deploying

   ```bash
   npm run demo
   ```

Deploying
-----------

After running `npm run build`, a single, distributable javascript library package is produced at `dist/xcomponent-library.frame.js`

Copy this file, along with any new component implementation html and any css to `deploy-static`.

Host the files contained in `deploy-static` on any web server or CDN. A node.js server is not required.

Now other sites, like EDS bottom-branding, can include `https://ebsco-xcomponents.com/xcomponent-library.frame.js` 
on their pages, and render the components.
