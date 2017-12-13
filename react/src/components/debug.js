// import React, { Component } from 'react'
import { message } from 'antd'

export const debug = (text) => {
  try {
    if (text instanceof JSON) {
      message.error(JSON.stringify(message))
    } else {
      message.error(text)
    }
  } 
  catch (err) {
    console.log(text)
  }
}