import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';
//import {URL} from '../Screens/Register.jsx';

const API_URL = import.meta.env.VITE_API_URL
//const Member = import.meta.env.Member;
const LOGIN_URL=`${API_URL}/register/login`

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        LOGIN_URL,
        { userName, password }
      );
      console.log(res)
      if (res.status === 200) {
        setTimeout(() => navigate('/home'), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #8360c3, #2ebf91)',
      padding: 2,
    }}>
      <Card sx={{
        maxWidth: 600,
        width: '100%',
        borderRadius: 3,
        boxShadow: 10,
        bgcolor: 'wheat'
      }}>
        <CardContent>
          <Typography variant='h4'
            component='h1'
            align='center'
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Login Account
          </Typography>
          {error && (
            <Typography
              color='error'
              variant='body2'
              align='center'
              gutterBottom
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack xs={12} sm={6} direction='row' spacing={2}>
                <TextField
                  label='User Name'
                  type='text'
                  variant='outlined'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  required />
                <TextField
                  label='Password'
                  type='password'
                  variant='outlined'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth required />
              </Stack>

              <Button type='submit'
                variant='contained'
                color='success'
                fullWidth
                sx={{
                  backgroundColor: 'greenish yellow',
                  ':hover': { bgcolor: 'green' }
                }}>
                {loading ? <ClipLoader size={20} color='white' /> : 'Login'}
              </Button>
              <Typography sx={{ textAlign: 'center' }}>Not Registered?<Link to={'/register'}>Register Here</Link></Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;