# WYSIWYG - React

***WYSIWYG - React*** is a React component that consists in a box in which users can write (think of it like a textarea html element), but also allows users to put in emotes.

Typically, WYSIWYG textareas like this allow emotes by opening a pop-up and then selecting the desired emotes. This component works a bit different, since there is no popup; users simply have to put their emotes in a specific folder
and write in the textarea as you normally would. If a text pattern you wrote matches with a file name of an emote placed in the emotes folder, it will be replaced with the matching emote when you stop writing.

## How to use
- Put your desired emotes in the emotes folder `src/img/emotes` and give them names you find suitable.
- Start the project with `npm start`.
- Whenever you write a text pattern that matches an emote name in the emotes folder, that pattern will be replaced with named emote.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
