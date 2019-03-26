import "isomorphic-fetch"; // define fetch
import React from 'react';
import TestUtility from 'src/utility/TestUtility';

/*
*   signInTestMode
*/

test('[signInTestMode] succeed to sign in', () => {
    // Run Test
    TestUtility.signInTestMode(TestUtility.accountEmail, TestUtility.accountPassword)
        .then(() => {
            expect(TestUtility.bearer).toBeDefined();
            TestUtility.signOutTestMode().catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[signInTestMode] failed to sign in', () => {
    // Run Test
    TestUtility.signInTestMode(TestUtility.failAccountEmail, TestUtility.failAccountPassword)
        .then(() => expect(TestUtility.bearer).toBeUndefined())
        .catch((error) => console.error(error));
});

/*
*   signOutTestMode
*/

test('[signOutTestMode] succeed to sign out', () => {
    // Run Test
    TestUtility.signInTestMode(TestUtility.accountEmail, TestUtility.accountPassword)
        .then(() => {
            TestUtility.signOutTestMode()
                .then(() => expect(TestUtility.bearer).toBeUndefined())
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[signOutTestMode] failed to sign out', () => {
    // Run Test
    TestUtility.signOutTestMode()
        .then(() => expect(TestUtility.bearer).toBeUndefined())
        .catch((error) => console.error(error));
});

/*
*   mockGetGenericPassword
*/

test('[mockGetGenericPassword] succeed to get credentials', () => {
    // Setup Test
    TestUtility.mockGetGenericPassword(true);

    // Run Test
    TestUtility.keychainModule.getGenericPassword()
        .then((credentials) => expect(credentials).not.toBe(false))
        .catch((error) => console.error(error));
});

test('[mockGetGenericPassword] failed to get credentials', () => {
    // Setup Test
    TestUtility.mockGetGenericPassword(false);

    // Run Test
    TestUtility.keychainModule.getGenericPassword()
        .then((credentials) => expect(credentials).toBe(false))
        .catch((error) => console.error(error));
});

/*
*   mockResetGenericPassword
*/

test('[mockResetGenericPassword] succeed to reset bearer', () => {
    // Setup Test
    TestUtility.mockResetGenericPassword();
    TestUtility.testValue = TestUtility.failAccountEmail;

    // Run Test
    TestUtility.keychainModule.resetGenericPassword()
        .catch((error) => console.error(error));
    expect(TestUtility.testValue).toBeUndefined();

    // Clear Test
    TestUtility.clearGlobalAttribute();
});

test('[mockResetGenericPassword] failed to reset bearer', () => {
    // Setup Test
    TestUtility.mockResetGenericPassword();

    // Run Test
    TestUtility.keychainModule.resetGenericPassword()
        .catch((error) => console.error(error));
    expect(TestUtility.testValue).toBeUndefined();
});

/*
*   mockSetGenericPassword
*/

test('[mockSetGenericPassword] succeed to set password', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();

    // Run Test
    TestUtility.keychainModule.setGenericPassword(TestUtility.failAccountEmail, TestUtility.failAccountPassword)
        .catch((error) => console.error(error));
    expect(TestUtility.testValue).toBe(TestUtility.failAccountPassword);

    // Clear Test
    TestUtility.clearGlobalAttribute();
});

test('[mockSetGenericPassword] failed to set password', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();

    // Run Test
    TestUtility.keychainModule.setGenericPassword(undefined, undefined)
        .catch((error) => console.error(error));
    expect(TestUtility.testValue).toBeUndefined();
});