import React from 'react';
import { Button } from '@mui/material';

const MyPacksToggle = () => {
    return (
        <div>
            <div>Show packs cards</div>
            <div>
                <Button
                    style={{
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                        border: '1px solid #D9D9D9',
                        borderRadius: '2px',
                    }}
                >
                    My
                </Button>
                <Button
                    style={{
                        boxSizing: 'border-box',
                        background: '#366EFF',
                        color: 'white',
                        border: '1px solid #D9D9D9',
                        borderRadius: '0px 2px 2px 0px',
                    }}
                >
                    All
                </Button>
            </div>
        </div>
    );
};

export default MyPacksToggle;
