import { describe, it, expect } from 'vitest'
import addComma from './addComma.js'

describe('addComma 数字格式化测试', () => {
  it('应该正确格式化正整数', () => {
    expect(addComma(123)).toBe('123')
    expect(addComma(1234)).toBe('1,234')
    expect(addComma(12345)).toBe('12,345')
    expect(addComma(123456)).toBe('123,456')
    expect(addComma(1234567)).toBe('1,234,567')
    expect(addComma(12345678)).toBe('12,345,678')
    expect(addComma(123456789)).toBe('123,456,789')
  })

  it('应该正确格式化负整数', () => {
    expect(addComma(-123)).toBe('-123')
    expect(addComma(-1234)).toBe('-1,234')
    expect(addComma(-12345)).toBe('-12,345')
    expect(addComma(-123456)).toBe('-123,456')
    expect(addComma(-1234567)).toBe('-1,234,567')
  })

  it('应该正确格式化带小数的正数', () => {
    expect(addComma(123.45)).toBe('123.45')
    expect(addComma(1234.56)).toBe('1,234.56')
    expect(addComma(12345.678)).toBe('12,345.678')
    expect(addComma(123456.789)).toBe('123,456.789')
    expect(addComma(1234567.123456)).toBe('1,234,567.123456')
  })

  it('应该正确格式化带小数的负数', () => {
    expect(addComma(-123.45)).toBe('-123.45')
    expect(addComma(-1234.56)).toBe('-1,234.56')
    expect(addComma(-12345.678)).toBe('-12,345.678')
    expect(addComma(-123456.789)).toBe('-123,456.789')
  })

  it('应该正确处理零值', () => {
    expect(addComma(0)).toBe('0')
    expect(addComma(-0)).toBe('0')
  })

  it('应该正确处理小于千的数字', () => {
    expect(addComma(1)).toBe('1')
    expect(addComma(12)).toBe('12')
    expect(addComma(123)).toBe('123')
    expect(addComma(999)).toBe('999')
    expect(addComma(-1)).toBe('-1')
    expect(addComma(-999)).toBe('-999')
  })

  it('应该正确处理恰好是千的倍数的数字', () => {
    expect(addComma(1000)).toBe('1,000')
    expect(addComma(10000)).toBe('10,000')
    expect(addComma(100000)).toBe('100,000')
    expect(addComma(1000000)).toBe('1,000,000')
    expect(addComma(-1000)).toBe('-1,000')
    expect(addComma(-1000000)).toBe('-1,000,000')
  })

  it('应该正确处理只有小数部分的数字', () => {
    expect(addComma(0.123)).toBe('0.123')
    expect(addComma(-0.456)).toBe('-0.456')
  })

  it('应该正确处理大数字', () => {
    expect(addComma(1234567890)).toBe('1,234,567,890')
    expect(addComma(-9876543210)).toBe('-9,876,543,210')
    expect(addComma(1234567890.123456)).toBe('1,234,567,890.123456')
  })
})
