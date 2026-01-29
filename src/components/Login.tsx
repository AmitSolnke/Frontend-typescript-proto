import React, {useState} from "react"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
} from "@mui/icons-material"
import {useQuery} from "@tanstack/react-query"
import {loginUser} from "../api/axiosLogin.api"
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{username?: string; password?: string}>(
    {},
  )
  const [submitError, setSubmitError] = useState("")

    const navigate = useNavigate();
 
  const validateForm = () => {
    const newErrors: {username?: string; password?: string} = {}
 
    if (!username.trim()) {
      newErrors.username = "Username is required"
    }
 
    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
 
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
 
  const {refetch, data} = useQuery({
    queryKey: ["login"],
    queryFn: () => loginUser({email_id: username, password}),
    enabled: false,
    retry: false,
  })
  console.log("dddata", data)
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
 
    if (!validateForm()) {
      return
    }
    try {
      const result = await refetch()
      console.log("ress", result)
      if (result.isSuccess && result.data?.token) {

        localStorage.setItem("token", result.data.token)
        navigate('/employee');
 
        // navigate("/employeeForm")
      } else {
        setSubmitError("Enter valid email and password")
      }
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Invalid credentials")
    }
    setIsLoading(true)
 
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500))
 
    setIsLoading(false)
    // For UI-only demo, show a success message or handle as needed
    console.log("Login attempted with:", {username, password})
  }
 
  console.log("login", data)
 
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c4ced8 100%)",
        padding: 4,
      }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        }}>
        <CardContent sx={{p: 4}}>
          {/* Logo/Title Section */}
          <Box sx={{textAlign: "center", mb: 4}}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
              }}>
              <LockIcon sx={{fontSize: 32, color: "white"}} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1a1a2e",
                mb: 0.5,
              }}>
              Welcome
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
              }}>
              Sign in to continue to your account
            </Typography>
          </Box>
 
          {/* Error Alert */}
          {submitError && (
            <Alert severity="error" sx={{mb: 3}}>
              {submitError}
            </Alert>
          )}
 
          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{color: "#9ca3af"}} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />
 
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{color: "#9ca3af"}} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={isLoading}
                      sx={{color: "#9ca3af"}}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />
 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  opacity: 0.7,
                },
              }}>
              {isLoading ? (
                <CircularProgress size={24} sx={{color: "white"}} />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
 
export default Login