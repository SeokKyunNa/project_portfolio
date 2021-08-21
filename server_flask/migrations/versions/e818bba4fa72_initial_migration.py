"""Initial migration

Revision ID: e818bba4fa72
Revises: 
Create Date: 2021-08-19 20:05:09.251028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e818bba4fa72'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('edu_status',
    sa.Column('code', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('code')
    )
    op.create_table('users',
    sa.Column('id', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('awards',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('award', sa.String(length=255), nullable=True),
    sa.Column('details', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('certificates',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('issued_by', sa.String(length=255), nullable=False),
    sa.Column('acquisition_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('educations',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('major', sa.String(length=100), nullable=True),
    sa.Column('edu_status', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['edu_status'], ['edu_status.code'], ondelete='SET DEFAULT'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('introduction', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('projects',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(length=20), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    edu_status = sa.sql.table('edu_status', 
    sa.Column('code', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(20), nullable=True)
    )
    op.bulk_insert(edu_status,
        [
            {'code': 1, 'status': '재학중'},
            {'code': 2, 'status': '고등학교졸업'},
            {'code': 3, 'status': '학사졸업'},
            {'code': 4, 'status': '석사졸업'},
            {'code': 5, 'status': '박사졸업'}
        ]
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('projects')
    op.drop_table('profiles')
    op.drop_table('educations')
    op.drop_table('certificates')
    op.drop_table('awards')
    op.drop_table('users')
    op.drop_table('edu_status')
    # ### end Alembic commands ###