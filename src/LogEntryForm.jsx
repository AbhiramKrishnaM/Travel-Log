function LogEntryForm() {
  return (
    <form className="entry-form">
      <label for="title">Title</label>
      <input name="title" required />
      <label for="comments">Comments</label>
      <textarea name="comments" row={3}></textarea>
      <label for="description">Description</label>
      <textarea name="description" row={3}></textarea>
      <label for="image">Image </label>
      <input name="image" />
      <label for="visitdate">Visit Date</label>
      <input name="visitdate" type="date" required />
      <button>Create Entry</button>
    </form>
  );
}

export default LogEntryForm;
