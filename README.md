# 'AnCross', or 'a React Lesson about complex APIs'

### What are we doing?

**Glad you asked.** Today we will be making a react app that queries an API that returns an *object of objects*. We want to process that object and return an instance of each one, then make a feature where we can "favorite" as many instances as we want!

### The API

[Animal Crossing: New Horizons](https://acnhapi.com/doc)

Specifically, we'll be using the [villagers endpoints](https://acnhapi.com/doc#tag/Villagers) to render a list of villagers.

Check out the [all villagers endpoint](http://acnhapi.com/v1/villagers/) in your broswer to get an idea of what data we'll be working with.

## Getting Started

To start, let's go ahead and instantiate a new react app. 

* fork and clone this repo

use

``` bash
npx create-react-app .
```

and we won't need any additional NPM packages, so we're now ready to 

``` bash
code .
npm start
```

## Clear the canvas.

The first thing I like to do once I know my React App is working is to delete the boilerplate code given to us by `create-react-app`. From our `return(` statement, let's remove:

``` html
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
</header>
```

Great! Now we have a truly empty workspace.

## Fetch the Data

AJAX API calls are a "side effect", which means our fetch call will go inside the [useEffect](https://reactjs.org/docs/hooks-effect.html) hook.

Import useEffect at the top of App.js:

``` js
import { useEffect } from 'react'
```

Now add the useEffect to the App component, fetch the data, and print it to the console:

``` js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        console.log('Villager Data:', rdata)
      })
  }, [])
  ```

## Make the data iterable

Now, how do we surf through an object and turn it into a useable iterable? We want to render a card for *each and every object in here* so we know that this needs to be treated like an array. How do we do that?

Javascript has a really handy method called `Object.values()`. This method takes an *object* as an argument, and returns all the *values* within that object as an array. Re-assign `rdata` to hold the values from the response data in an array.

Adapt your useEffect to look like so:
``` js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response => response.json())
    .then((rdata) => {
      rdata = Object.values(rdata)
      console.log(rdata)
    })
  }, [])
```

Super! Now our `rdata` variable should represent an *array of objects*. This is much more usable given our app!

## Made the Data Useable

We want to use this data to (for now), render a list of every villager's name. Store the array of villagers in state so you can access it within the render method. What Hook do you need for this?

at the top, import useState
```js
import { useEffect, useState } from 'react'
```

Set up a villagerData state
```js
  let [data, setData] = useState({villagers: []})
```

Adapt the useEffect:

```js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({villagers: rdata})
        console.log('Villager Data:', rdata)
      })
  }, [])
```

## Render a list of villager names

Use the map iterator to render a list of villager names.

<details>
<summary></summary>
        
```js
  const villagerList = data.villagers.map((villager)=>{
    return <li>{villager.name['name-USen']}</li>
  })
  return (
    <div className="App">
      <ul>{villagerList}</ul> 
    </div>
  )
```
        
</details>

## Build It Out: DisplayCards
Now that we can pull in and display the data, we'll begin to build out our app! Eventually, we'll render several villager cards onto the page. Let's first send our villager data to a DisplayCards component that displays the image and name for each villager.


Replace the App.js content with a DisplayCards component that recieves a villagers prop:

```js
    <div className="App">
      <DisplayCards villagers={data.villagers}/>
    </div>
```

Now build out DisplayCards so it renders a list of villagers, displaying their name **and their image**. (Where is the image in the data?)

<details>
<summary>Solution</summary>

Inside of `DisplayCards.js`

```js
function DisplayCards(props) {
    const allVillagers = props.villagers.map(v=>{
        return (
            <li>
                <img src={v.image_uri} alt={v.name['name-USen']} />
                <p>{v.name['name-USen']}</p>
            </li>
        )
    })
    return (
        <ul>{allVillagers}</ul>
    )
}

export default DisplayCards
```
</details>
<br>
Got it? Well done!

## Add a Search Filter

But what if we wanted to add a feature where users could search for a particular villager? How could we implement dynamic search functionality, the like of which we used in Fruit Filter, here in this application? Take a moment to work independently and see if you can develop a feature which can handle this!

First, add an input box in App.js:

```js
    <div className="App">
      <div>
        <label htmlFor="villager-search">Search for a villager:</label>
        <input 
          id="villager-search" 
          type="text" 
          value={search} 
          onChange={handleChange}
        />
      </div>
      <DisplayCards villagers={getFilteredVillagers()}/>
    </div>
```

Now, create a `getfilteredVillagers` helper method that returns an array of villagers whose name includes a substring that matches the search:

_Hint: utilize .filter(), .toLowerCase(), and .includes()_

<details>
<summary></summary>


```js
  const getFilteredVillagers = (e) => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter(v => {
      let lowerCaseName = v.name['name-USen'].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }
```

and within the return...

</details>

## Even further! Favorite functionality:

Awesome!! Now our users can search for a particular villager, and *just* render that villager. Neat! 
But what if we wanted to develop a list of favorites? It's not that difficult, remember we have all the pieces we need! We just need to develop a new state variable to track villagers that the user likes.

Let's do just that:
```js
  let [faves, setFaves] = useState([])
```
Now, we just need to build a function that can populate that state. Let's stop and consider how we want our users to interact with our page.

For simplicity's sake, I think I would prefer if the user could simply click on a villager portrait, and that would populate that villager into the array. That's easy in react! Remember `onClick`? 

Add a handleClick helper method to App.js... 

```js
  const handleClick = (villager) => {
    setFaves([...faves, villager])
  }
```

...pass it to DisplayCards as a prop...

```js
     <DisplayCards villagers={getFilteredVillagers()} handleClick={handleClick} />
```

...and put it on each image as the onClick (use an anonymous function wrapper to pass a villager into the handleClick inside DisplayCards).

```js
    <img src={v.image_uri} alt={v.name['name-USen']} onClick={()=>props.handleClick(v)}/>
```

Check to see that villagers are being added to the faves state (in the React dev tools)!

## Display Favorites

Display a list of favorite villagers underneath the search results.

**hint: we already have a DisplayCards component!**

<details>
<summary></summary>
In app.js...

```js
      <div>
        <h1>Favorite Villagers:</h1>
        <DisplayCards villagers={faves}/>
      </div>
```

</details>

## But wait. There's more!

Our functionality is glorious at this point, but we currently have a few edge cases that need to be handled. Independently, try to work out what edge cases we need to handle, and how we can resolve them!

First issue: We can send a villager to our faves array multiple times. While it does resemble my preference of having 45 instances of Chevre as my "favorite villagers" it's actually a fairly poor user experience.

Second issue: if we click a villager inside of our "faves" display, it results in an error. This is because we do *not* want onClick functionality for our faves to share the onClick functionality with our standard display.

<details>
<summary>Don't you open this until you've given this a good shot.</summary>

```js
  const handleClick = (villager) => {
    if(!favs.includes(villager)){
      setFavs([...faves, villager])
    }
  }
```

simple enough!

        
There are great ways to fix this, but here's a lazy solution that will easily patch right over:

```js
//in app.js
 <div>
    <DisplayCards clickie={true} handleClick={handleClick} data={dynamicSearch()}/>
  </div>
  <div className="favBox">
    <DisplayCards clickie={false} data={favs} />
  </div>
```
Simple enough, I've added a boolean value as props to each of my displayCards components. Now let's handle the logic on the DisplayCards end.

```js
// in DisplayCards.js
<div key={i} className="villagerCard" onClick={() => props.clickie ? props.handleClick(villager) : null}>
  <img src={villager['image_uri']} alt={villager.name['name-USen']} />
  <p>{villager.name['name-USen']}</p>
</div>

```
Again, there are other solutions to this problem! But in this case, we've patched right over the error. If "clickie" is true, great! Run the handleClick. However, if it is *not* then the computer will not even make the attempt to run the function. The onClick behavior resolves to `null`.

</details>

## Keep exploring!!

Explore more on this topic as you please; there's a lot of data within the animal crossing API, why not build out new app functionality? Have fun!
