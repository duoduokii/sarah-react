import React, { useState, useEffect } from 'react';
import Style from './index.module.scss'

import { transCanvasToImg } from '../utils/canvas'

function Detail() {
  const [canvasW, setCanvasW] = useState<number>(0)
  const [canvasH, setCanvasH] = useState<number>(0)

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  function initCanvas() {
    const canvas = document.getElementById('canvas-app') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    setCanvas(canvas)
    setCtx(ctx)
  }

  function initCanvasStyle() {
    const screenW = document.body.clientWidth
    const screenH = document.body.clientHeight
    setCanvasW(screenW)
    setCanvasH(screenH)
  }

  function initListener() {
    if (canvas === null || ctx === null) return
    let hasMouseDown = false
    let sX: number, sY: number
    canvas.addEventListener('mousedown', (e) => {
      hasMouseDown = true
      sX = e.offsetX
      sY = e.offsetY
    }, false)
    canvas.addEventListener('mousemove', (e) => {
      if (!hasMouseDown) return
      // TODO 兼容性处理
      const [x, y] = [e.offsetX, e.offsetY]
      ctx.strokeStyle = '#09f';
      ctx.beginPath();
      ctx.moveTo(sX, sY);
      ctx.lineTo(x, y);
      ctx.stroke();
      sX = x
      sY = y
    })
    canvas.addEventListener('mouseup', () => {
      hasMouseDown = false
    })
  }

  useEffect(() => {
    initCanvas()
    initCanvasStyle()
  }, [])

  useEffect(() => {
    initListener()
  }, [canvas, ctx])

  /**
   * page event
   */

  function handleOnSave() {
    if (canvas === null) return
    transCanvasToImg({ canvas })
  }

  return (
    <div className={Style.detail}>
      <canvas id="canvas-app" width={canvasW} height={canvasH}></canvas>
      <button className={Style.btn} onClick={handleOnSave}>保存</button>
    </div>
  );
}

export default Detail;
