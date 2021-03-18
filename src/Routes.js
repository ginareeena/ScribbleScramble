import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import String from './String'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/string' component={String}/>
            </Switch>
        </Router>
    )
}

export default Routes