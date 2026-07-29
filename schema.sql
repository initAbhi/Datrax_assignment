-- ==========================================
-- QSR Menu Change Request (CR) Tracker Schema
-- Database: Microsoft SQL Server (MSSQL)
-- ==========================================

-- 1. Create Users Table
CREATE TABLE [users] (
    [id] uniqueidentifier NOT NULL DEFAULT NEWSEQUENTIALID(),
    [email] varchar(255) NOT NULL,
    [password] varchar(255) NOT NULL,
    [role] varchar(50) NOT NULL,
    [createdAt] datetime2 NOT NULL DEFAULT getdate(),
    [updatedAt] datetime2 NOT NULL DEFAULT getdate(),
    CONSTRAINT [PK_users_id] PRIMARY KEY ([id]),
    CONSTRAINT [UQ_users_email] UNIQUE ([email])
);
GO

-- 2. Create Menu Items Table
CREATE TABLE [menu_items] (
    [id] uniqueidentifier NOT NULL DEFAULT NEWSEQUENTIALID(),
    [name] varchar(255) NOT NULL,
    [currentPrice] decimal(10,2),
    [currentAvailability] bit NOT NULL DEFAULT 1,
    [description] text,
    [createdAt] datetime2 NOT NULL DEFAULT getdate(),
    [updatedAt] datetime2 NOT NULL DEFAULT getdate(),
    CONSTRAINT [PK_menu_items_id] PRIMARY KEY ([id])
);
GO

-- 3. Create Change Requests Table
CREATE TABLE [change_requests] (
    [id] uniqueidentifier NOT NULL DEFAULT NEWSEQUENTIALID(),
    [requestNumber] varchar(255) NOT NULL,
    [itemId] uniqueidentifier NOT NULL,
    [changeType] varchar(50) NOT NULL,
    [oldValue] text,
    [newValue] text NOT NULL,
    [reason] text NOT NULL,
    [status] varchar(50) NOT NULL DEFAULT 'PENDING',
    [createdById] uniqueidentifier NOT NULL,
    [approvedById] uniqueidentifier,
    [createdAt] datetime2 NOT NULL DEFAULT getdate(),
    [updatedAt] datetime2 NOT NULL DEFAULT getdate(),
    [approvedAt] datetime2,
    CONSTRAINT [PK_change_requests_id] PRIMARY KEY ([id]),
    CONSTRAINT [UQ_change_requests_requestNumber] UNIQUE ([requestNumber]),
    
    -- Foreign Keys
    CONSTRAINT [FK_change_requests_itemId] FOREIGN KEY ([itemId]) 
        REFERENCES [menu_items]([id]) ON DELETE CASCADE,
        
    CONSTRAINT [FK_change_requests_createdById] FOREIGN KEY ([createdById]) 
        REFERENCES [users]([id]),
        
    CONSTRAINT [FK_change_requests_approvedById] FOREIGN KEY ([approvedById]) 
        REFERENCES [users]([id])
);
GO

-- 4. Create Performance Indexes
CREATE INDEX [IDX_change_requests_status_approvedAt] ON [change_requests] ([status], [approvedAt]);
CREATE INDEX [IDX_change_requests_createdById_status] ON [change_requests] ([createdById], [status]);
GO

-- 5. Seed Initial Data
-- Insert Default Users (Password is 'password123' for both)
INSERT INTO [users] ([email], [password], [role]) VALUES 
('manager@sapphire.com', '$2b$10$aJdDJKoILtrQR1/TwL/FF.FuNAj8n/KTH18fSYKGzBSsQL/5bxfqK', 'MANAGER'),
('supervisor@sapphire.com', '$2b$10$aJdDJKoILtrQR1/TwL/FF.FuNAj8n/KTH18fSYKGzBSsQL/5bxfqK', 'SUPERVISOR');
GO

-- Insert Menu Items
INSERT INTO [menu_items] ([name], [currentPrice], [currentAvailability], [description]) VALUES 
('Classic Burger', 8.99, 1, 'Juicy beef patty with lettuce and tomato.'),
('Margherita Pizza', 12.50, 1, 'Traditional pizza with fresh mozzarella and basil.'),
('Caesar Salad', 7.00, 1, 'Crisp romaine, parmesan, croutons, and Caesar dressing.'),
('Spicy Wings', 9.99, 0, '10 pieces of hot wings with blue cheese dip.');
GO
