import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendStakingNotification(
  email: string,
  stakingData: {
    amount: string
    period: number
    estimatedReward: string
    txHash: string
  }
) {
  const htmlContent = `
    <h2>Staking Confirmation</h2>
    <p>Your staking transaction has been confirmed!</p>
    <ul>
      <li><strong>Amount Staked:</strong> ${stakingData.amount} AGL</li>
      <li><strong>Lockup Period:</strong> ${stakingData.period} days</li>
      <li><strong>Estimated Reward:</strong> ${stakingData.estimatedReward} AGL</li>
      <li><strong>Transaction Hash:</strong> <a href="https://basescan.org/tx/${stakingData.txHash}">${stakingData.txHash}</a></li>
    </ul>
    <p>View your staking position in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">dashboard</a>.</p>
  `

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'AGL Staking Confirmed',
    html: htmlContent,
  })
}

export async function sendWithdrawalNotification(
  email: string,
  withdrawalData: {
    amount: string
    reward: string
    txHash: string
  }
) {
  const htmlContent = `
    <h2>Withdrawal Complete</h2>
    <p>Your staking withdrawal has been processed!</p>
    <ul>
      <li><strong>Principal:</strong> ${withdrawalData.amount} AGL</li>
      <li><strong>Rewards Earned:</strong> ${withdrawalData.reward} AGL</li>
      <li><strong>Total Received:</strong> ${parseFloat(withdrawalData.amount) + parseFloat(withdrawalData.reward)} AGL</li>
      <li><strong>Transaction Hash:</strong> <a href="https://basescan.org/tx/${withdrawalData.txHash}">${withdrawalData.txHash}</a></li>
    </ul>
  `

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'AGL Withdrawal Complete',
    html: htmlContent,
  })
}

export async function sendGasSponsorshipNotification(
  email: string,
  approved: boolean
) {
  const htmlContent = `
    <h2>Gas Sponsorship ${approved ? 'Approved' : 'Denied'}</h2>
    <p>${
      approved
        ? 'Great news! Your transaction will be sponsored with free gas.'
        : 'Your transaction could not be sponsored. You may need to hold 100+ AGL tokens.'
    }</p>
  `

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Gas Sponsorship ${approved ? 'Approved' : 'Denied'}`,
    html: htmlContent,
  })
}

export async function sendAnalyticsReport(
  email: string,
  reportData: {
    totalStaked: string
    totalRewards: string
    activePositions: number
    portfolioValue: string
  }
) {
  const htmlContent = `
    <h2>Your Weekly AGL Report</h2>
    <table border="1" cellpadding="10">
      <tr>
        <td><strong>Total Staked</strong></td>
        <td>${reportData.totalStaked} AGL</td>
      </tr>
      <tr>
        <td><strong>Total Rewards Earned</strong></td>
        <td>${reportData.totalRewards} AGL</td>
      </tr>
      <tr>
        <td><strong>Active Positions</strong></td>
        <td>${reportData.activePositions}</td>
      </tr>
      <tr>
        <td><strong>Portfolio Value</strong></td>
        <td>${reportData.portfolioValue}</td>
      </tr>
    </table>
    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">View full analytics</a></p>
  `

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Weekly AGL Report',
    html: htmlContent,
  })
}
