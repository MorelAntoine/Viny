import "isomorphic-fetch" // define fetch
import React from 'react';
import RegexUtility from 'src/utility/RegexUtility';
import TestUtility from 'src/utility/TestUtility';

jest.useFakeTimers(); // Fix Jest crash with Native Base

test('Correct email', () => {
    expect(RegexUtility.isEmailValid(TestUtility.accountEmail)).toBe(true);
});

test('Incorrect email', () => {
    expect(RegexUtility.isEmailValid("jerry@az")).toBe(false);
});