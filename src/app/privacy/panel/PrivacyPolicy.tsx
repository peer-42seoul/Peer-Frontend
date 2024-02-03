import { Stack, Typography } from '@mui/material'
import axios from 'axios'

const PrivacyPolicy = async () => {
  await axios.get('https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_ad016d3302b840af94a1946c5784d85a/PeerMainStorage/primary-data/operation-docs/private-information-process-rule-240205.md')
  return (
    
  )
}

export default PrivacyPolicy
