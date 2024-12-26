<template>
    <div class="profile">
      <div class="profile-header">
        <span class="profile-title">Hero</span>
        <p class="username">Username</p>
      </div>
      <section class="stats">
        <p class="stat-money">{{ money }}$</p>
        <p class="stat-diamonds">0</p>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useResource } from '../composable/useResource';
  
  const { money } = useResource();
  </script>
  
  <style scoped>
  /* General Styles */
  .profile {
    background-color: #1a1a1a;
    border: 3px solid #242424;
    padding: 16px;
    border-radius: 8px;
    display: inline-block;
    width: 300px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
  
  .profile-header {
    margin-bottom: 16px;
  }
  
  .profile-title {
    display: block;
    font-size: 18px;
    color: #ffcc00; /* Retro gold color */
    text-shadow: 1px 1px 2px #000;
  }
  
  .username {
    font-size: 14px;
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.87);
  }
  
  .stats {
    background-color: #242424;
    border: 2px dashed #ffcc00;
    padding: 8px;
    border-radius: 4px;
  }
  
  .stat-money,
  .stat-diamonds {
    font-size: 14px;
    margin: 8px 0;
    color: #00ff00; /* Retro green for stats */
    text-shadow: 1px 1px 2px #000;
  }
  
  .stat-money::before {
    content: "💰 ";
  }
  
  .stat-diamonds::before {
    content: "💎 ";
  }
  
  /* 8-Bit Style Animations */
  /* .profile:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  } */
  </style>
  