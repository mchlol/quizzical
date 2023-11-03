# Quizzical

Final project for React Basics at [Scrimba](scrimba.com)  

## Resources

- [Pill radio buttons](https://codepen.io/rstacruz/pen/zWXJGj) (when using a form and inputs)
- [functional component doesn't re-render on props change](https://stackoverflow.com/a/72369833) - buttons weren't re-rendering when the state of `finished` updated in the Quiz component. I mistakenly thought when the props passed from the parent changed the Question component would re-render. Added a useEffect to update the state of `finished` in the Question component and hallelujah it worked. 

### Notes

Specific to Scrimba projects, it does not support the spread operator so a plugin is required. Saving it here so I don't lose time/my mind next time I do a Scrimba project 🤡  
```
Step 1: cd in to your project and install 
npm i babel-plugin-transform-object-rest-spread

Step2: After installation, open your webpack.config.js and below the presets add the plugin like this.

"presets": [
        "babel-preset-env",
        "babel-preset-react"
        ],
     "plugins": ["babel-plugin-transform-object-rest-spread"]
```

There appears to be a similar problem with using fragments, and the issue might actually with the version of webpack the project templates use. There are a couple of ways around it (update the webpack version or use another plugin) A project template is just the absolute bare bones so in future I'll scaffold it myself.  