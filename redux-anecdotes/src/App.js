import React from 'react';

class App extends React.Component {
  handleVote = (id) => {
    return (() => {
      this.props.store.dispatch({
        type: 'VOTE',
        data: { id }
      })
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    this.props.store.dispatch({
      type: 'NEW',
      data: { content }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="content" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App