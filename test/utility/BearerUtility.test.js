import React from 'react';
import TestUtility from 'src/utility/TestUtility';
import BearerUtility from 'src/utility/BearerUtility';

/*
*   getBearer
*/

test('[getBearer] has bearer', () => {
    // Setup Test
    TestUtility.mockGetGenericPassword(true);
    TestUtility.bearer = TestUtility.failAccountEmail;

    // Run Test
    BearerUtility.getBearer().then((bearer) => {
        expect(bearer).toBe(TestUtility.bearer);
    });

    // Clear Test
    TestUtility.clearGlobalAttribute();
});

test('[getBearer] no bearer', () => {
    // Setup Test
    TestUtility.mockGetGenericPassword(false);

    // Run Test
    BearerUtility.getBearer().then((bearer) => {
        expect(bearer).toBe('');
    });
});

/*
*   removeBearer
*/

test('[removeBearer] correctly removed', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();
    TestUtility.mockResetGenericPassword();

    // Run Test
    BearerUtility.setBearer('token');
    BearerUtility.removeBearer();
    expect(TestUtility.testValue).toBeUndefined();

    // Clear Test
    TestUtility.clearGlobalAttribute();
});

test('[removeBearer] no bearer to remove', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();
    TestUtility.mockResetGenericPassword();

    // Run Test
    BearerUtility.setBearer(undefined);
    BearerUtility.removeBearer();
    expect(TestUtility.testValue).toBeUndefined();
});

/*
*   setBearer
*/

test('[setBearer] correctly set', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();

    // Run Test
    BearerUtility.setBearer('token');
    expect(TestUtility.testValue).toBe('token');

    // Clear Test
    TestUtility.clearGlobalAttribute();
});

test('[setBearer] incorrectly set', () => {
    // Setup Test
    TestUtility.mockSetGenericPassword();

    // Run Test
    BearerUtility.setBearer(undefined);
    expect(TestUtility.testValue).toBeUndefined();
});
