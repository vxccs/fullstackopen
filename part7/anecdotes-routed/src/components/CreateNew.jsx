import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew, showNotification }) => {
  const { reset: contentReset, ...content } = useField('text');
  const { reset: authorReset, ...author } = useField('text');
  const { reset: infoReset, ...info } = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    showNotification(`'${content}' has been added`);
    navigate('/');
  };

  const resetForm = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
